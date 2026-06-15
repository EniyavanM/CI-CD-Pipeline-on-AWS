import pytest
from fastapi.testclient import TestClient

import app.main as main
from app.main import app


@pytest.fixture(autouse=True)
def reset_store():
    main._items.clear()
    main._next_id = 1
    yield
    main._items.clear()
    main._next_id = 1


@pytest.fixture
def client():
    return TestClient(app)


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_items_empty(client):
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == []


def test_create_and_get_item(client):
    create_response = client.post(
        "/items",
        json={"name": "Widget", "description": "A sample item"},
    )
    assert create_response.status_code == 201
    created = create_response.json()
    assert created == {
        "id": 1,
        "name": "Widget",
        "description": "A sample item",
    }

    get_response = client.get("/items/1")
    assert get_response.status_code == 200
    assert get_response.json() == created


def test_get_item_not_found(client):
    response = client.get("/items/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}
