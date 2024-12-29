from fastapi import APIRouter, HTTPException, Depends
from backend.database.db_requests import create_new_user, user_login
from backend.schemas.models import UserDtoLogin, UserReg
from sqlalchemy.orm import Session
from backend.database.connection import get_session
from backend.auth.handler import signJWT


router = APIRouter(tags=['Auth'])

@router.post("/register")
def register_new_user(user: UserReg, db: Session = Depends(get_session)) -> dict[str, str]:
    new_user = create_new_user(user, db)
    return signJWT(new_user.id)

@router.post("/login")
def login(user: UserDtoLogin, db: Session = Depends(get_session)) -> dict[str, str]:
    uid = user_login(user, db)
    if uid:
        return signJWT(uid)
    raise HTTPException(status_code=404, detail="Item Not Found")