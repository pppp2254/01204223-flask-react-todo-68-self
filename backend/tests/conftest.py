import sys
from pathlib import Path
from flask import g
from flask_jwt_extended.config import config
from main import app as flask_app
from models import db

import pytest

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


@pytest.fixture
def app():
    flask_app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    })

    with flask_app.app_context():
        db.drop_all()
        db.create_all()

    return flask_app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def app_context(app):
    with app.app_context():
        from models import User
        user = User(username='test_user', full_name='Test User')
        user.set_password('password')
        db.session.add(user)
        db.session.commit()
        yield


@pytest.fixture(autouse=True)
def no_jwt(monkeypatch):
    def no_verify(*args, **kwargs):
        g._jwt_extended_jwt = {
            config.identity_claim_key: 'test_user'
        }

    from flask_jwt_extended import view_decorators
    monkeypatch.setattr(view_decorators, 'verify_jwt_in_request', no_verify)


@pytest.fixture
def sample_todo_items(app_context):
    from models import TodoItem, db, User
    user = User.query.filter_by(username='test_user').first()
    todo1 = TodoItem(title='Todo 1', done=False, user_id=user.id)
    todo2 = TodoItem(title='Todo 2', done=True, user_id=user.id)
    db.session.add_all([todo1, todo2])
    db.session.commit()
    return [todo1, todo2]