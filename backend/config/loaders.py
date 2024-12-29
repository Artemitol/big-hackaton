from environs import Env
from pydantic import BaseModel


class DatabaseConfig(BaseModel):
    host: str
    port: int
    user: str
    password: str
    name: str


def load_database_config() -> DatabaseConfig:
    env = Env()
    env.read_env()
    return DatabaseConfig(
        host=env.str("DB_HOST"),
        port=env.int("DB_PORT"),
        user=env.str("DB_USER"),
        password=env.str("DB_PASSWORD"),
        name=env.str("DB_NAME")
    )