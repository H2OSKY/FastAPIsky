from fastapi import FastAPI, Request, Depends, Form, status, HTTPException
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
import models
from database import engine, sessionlocal
import random
import string

models.Base.metadata.create_all(bind=engine)

templates = Jinja2Templates(directory="templates")

app = FastAPI()

app.title = "CRUD Hoover"
app.version = "Betalguese"

app.mount("/static", StaticFiles(directory="static"), name="static")


class Item(BaseModel):
    name: str = Field(default="Hoover", min_length=2, max_length=30)
    email: str = Field(default="", min_length=10, max_length=40)
    password: str = Field(default="", min_length=4, max_length= 20)


def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["Home"])
async def home(request: Request, db: Session = Depends(get_db)):
    users = db.query(models.User).order_by(models.User.id.desc())
    return templates.TemplateResponse("index.html", {"request": request, "users": users})


@app.post("/add", tags=["Add"])
async def add(request: Request, item: Item, db: Session = Depends(get_db)):
    users = models.User(name=item.name, email=item.email, password=item.password)
    db.add(users)
    db.commit()
    return {"message": "User created successfully"}

    # return RedirectResponse(url=app.url_path_for("home"), status_code=status.HTTP_303_SEE_OTHER)


@app.get("/addnew", tags=["AddView"])
async def addnew(request: Request):
    return templates.TemplateResponse("addnew.html", {"request": request})

@app.get("/cards", tags=["Cards"])
async def addnew(request: Request):
    return templates.TemplateResponse("cards.html", {"request": request})

@app.get("/carousel", tags=["Carousel"])
async def addnew(request: Request):
    return templates.TemplateResponse("carousel.html", {"request": request})

@app.get("/get_item/{user_id}", response_class=JSONResponse)
async def get_item(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return {"name": user.name, "email": user.email, "password": user.password}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.put("/update/{user_id}")
async def update(user_id: int, item: Item, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        user.name = item.name
        user.email = item.email
        user.password = item.password
        db.commit()
        return {"message": "User updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.delete("/delete/{user_id}")
async def delete(request: Request, user_id: int, db: Session = Depends(get_db)):
    users = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(users)
    db.commit()
    return {"message": "User delete successfully"}
    # return RedirectResponse(url=app.url_path_for("home"), status_code=status.HTTP_303_SEE_OTHER)


def generate_password(length: int, include_uppercase: bool, include_digits: bool, include_special_chars: bool) -> str:
    characters = string.ascii_lowercase
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_digits:
        characters += string.digits
    if include_special_chars:
        characters += string.punctuation

    if length < 1:
        raise HTTPException(status_code=400, detail="La longitud de la contraseña debe ser al menos 1.")
    
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

@app.post("/generate-password", tags=["Password"])
def generate_password_endpoint(
    length: int = Form(..., gt=0, description="Longitud de la contraseña"),
    include_uppercase: str = Form('true', description="Incluir letras mayúsculas"),
    include_digits: str = Form('true', description="Incluir dígitos"),
    include_special_chars: str = Form('false', description="Incluir caracteres especiales"),
):
    
    password = generate_password(length, include_uppercase, include_digits, include_special_chars)
    return {"password": password}