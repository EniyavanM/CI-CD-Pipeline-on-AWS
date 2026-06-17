from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Sample API", version="1.0.0")

_items: dict[int, dict[str, str]] = {}
_next_id = 1


class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(default="", max_length=500)


class Item(ItemCreate):
    id: int


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/items", response_model=list[Item])
def list_items() -> list[Item]:
    return [Item(id=item_id, **data) for item_id, data in sorted(_items.items())]


@app.post("/items", response_model=Item, status_code=201)
def create_item(payload: ItemCreate) -> Item:
    global _next_id
    item_id = _next_id
    _next_id += 1
    _items[item_id] = payload.model_dump()
    return Item(id=item_id, **_items[item_id])


@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int) -> Item:
    if item_id not in _items:
        raise HTTPException(status_code=404, detail="Item not found")
    return Item(id=item_id, **_items[item_id])

@app.get("/api/status")
def status():
    return {
        "app": "my-cicd-app",
        "version": "1.0.0",
        "status": "running"
    }