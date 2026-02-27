from http import HTTPStatus
import pytest
from flask import g
from flask_jwt_extended.config import config


from models import TodoItem, db

def create_todo(title='Sample todo', done=False):
    todo = TodoItem(title=title, done=done)
    db.session.add(todo)
    db.session.commit()
    return todo

def test_get_sample_todo_items(client, sample_todo_items):
    response = client.get('/api/todos/')
    assert response.status_code == HTTPStatus.OK
    assert response.get_json() == [todo.to_dict() for todo in sample_todo_items] 

def test_toggle_todo_item(client, sample_todo_items):
    item1, item2 = sample_todo_items

    response = client.patch(f'/api/todos/{item1.id}/toggle/')
    assert response.status_code == HTTPStatus.OK

    data = response.get_json()
    assert data['done'] is True
    assert db.session.get(TodoItem, item1.id).done is True