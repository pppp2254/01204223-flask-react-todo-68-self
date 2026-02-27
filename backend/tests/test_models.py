from models import User
from models import TodoItem, Comment, db

def test_check_correct_password():
    user = User()
    user.set_password("testpassword")
    assert user.check_password("testpassword") == True

def test_check_incorrect_password():
    user = User()
    user.set_password("testpassword")
    assert user.check_password("testpassworx") == False

def test_empty_todoitem(app_context):
    assert TodoItem.query.count() == 0