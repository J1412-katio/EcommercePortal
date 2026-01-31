from pydantic import BaseSettings


class Settings(BaseSettings):
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_DB: str = "ecommerce_db"




    @property
    def sqlalchemy_database_uri(self) -> str:
        return (
            "mysql+pymysql://"
            f"{self.MYSQL_USER}:{self.MYSQL_PASSWORD}"
            f"@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"
            "?charset=utf8mb4"
        )

    class Config:
        env_file = ".env.example"


settings = Settings()