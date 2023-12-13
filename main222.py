# from fastapi import FastAPI, Request, Depends, Form, status
# from fastapi.templating import Jinja2Templates
# import models
# from database import engine, sessionlocal
# from sqlalchemy.orm import Session
# from fastapi.responses import RedirectResponse, JSONResponse
# from pydantic import BaseModel, Field
# from fastapi.staticfiles import StaticFiles


# models.Base.metadata.create_all(bind=engine)

# templates = Jinja2Templates(directory="templates")

# app = FastAPI()

# app.title = "CRUD Hoover"
# app.version = "Betalguese"

# app.mount("/static", StaticFiles(directory="static"), name="static")

# class Item(BaseModel):
#     name: str = Field(default="Hoover", min_length=2, max_length=30)
#     email: str = Field(default="", min_length=10, max_length=40)

# def get_db():
#     db = sessionlocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.get("/", tags=["Home"])
# async def home(request: Request, db: Session = Depends(get_db)):
#     users = db.query(models.User).order_by(models.User.id.desc())
#     return templates.TemplateResponse("index.html", {"request": request, "users": users})

# @app.post("/add", tags=["Add"])
# async def add(request: Request, name:str = Form(...), email:str = Form(...), db: Session = Depends(get_db)):
#     print(name)
#     print(email)
#     users = models.User(name=name, email=email)
#     db.add(users)
#     db.commit()
#     return RedirectResponse(url=app.url_path_for("home"), status_code=status.HTTP_303_SEE_OTHER)

# @app.get("/addnew", tags=["AddView"])
# async def addnew(request: Request):
#     return templates.TemplateResponse("addnew.html", {"request": request})


# @app.get("/get_item/{user_id}", response_class=JSONResponse)
# async def get_item(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if user:
#         return {"name": user.name, "email": user.email}
#     else:
#         raise HTTPException(status_code=404, detail="User not found")
 
# # @app.put("/update/{user_id}")
# # async def update(request: Request, user_id: int, name: str = Form(...), email: str = Form(...), db: Session = Depends(get_db)):
# #     users = db.query(models.User).filter(models.User.id == user_id).first()
# #     users.name = name
# #     users.email = email
# #     db.commit()
# #     return RedirectResponse(url=app.url_path_for("home"), status_code=status.HTTP_303_SEE_OTHER)

# @app.put("/update/{user_id}")
# async def update(user_id: int, name: str = Form(...), email: str = Form(...), db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if user:
#         user.name = name
#         user.email = email
#         db.commit()
#         return {"message": "User updated successfully"}
#     else:
#         raise HTTPException(status_code=404, detail="User not found")

 
# @app.get("/delete/{user_id}")
# async def delete(request: Request, user_id: int, db: Session = Depends(get_db)):
#     users = db.query(models.User).filter(models.User.id == user_id).first()
#     db.delete(users)
#     db.commit()
#     return RedirectResponse(url=app.url_path_for("home"), status_code=status.HTTP_303_SEE_OTHER)

