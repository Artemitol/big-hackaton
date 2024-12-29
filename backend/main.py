from fastapi import FastAPI
import uvicorn

from backend.auth.bearer import JWTBearer
from backend.database.models import base
from backend.database.connection import engine
from backend.routers.get_vals import router
from backend.routers.add_router import create_router

app = FastAPI()

app.include_router(router)
app.include_router(create_router)

@app.get("/")
def home():
    return {"message": f"Hello World!"}

@app.on_event("startup")
async def startup_event():
    base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

