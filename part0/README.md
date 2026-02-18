# Part 0 — Fundamentals of Web apps

This folder contains the completed exercises from **Part 0** of the Full Stack Open course offered by the University of Helsinki.  
Part 0 introduces the fundamentals of web applications, how web pages work, and exercises related to classic and single-page app interactions. 

## 📌 Exercises in this folder

### 0.4 — New note diagram  
A sequence diagram that illustrates what happens when the user opens the traditional notes page and creates a new note using the browser form submit.

📍 The diagram shows multiple HTTP requests:  
- HTML → CSS → JS → fetch data.json  
- Form POST → 302 Redirect → reload  
- Final fetch of updated notes data

(using Mermaid syntax)

### 0.5 — Single page app diagram  
A diagram that describes the loading of the Single Page App version of the notes application (`/spa`).  
It shows how the browser fetches a single HTML document, associated CSS and JS, and then requests JSON data to render notes dynamically without page reload.

### 0.6 — New note in Single page app diagram  
A diagram that shows what happens when a new note is created in the SPA version:  
- JavaScript intercepts the form submit
- The browser sends a JSON POST request
- The application updates state locally and sends JSON to the server
- Server responds with 201 without redirect

## 🛠 Technology used

The diagrams are written using **Mermaid syntax** so that they are rendered directly on GitHub.

## 📌 Folder Structure

```bash
part0/
├── README.md 
├── 04-NewNote-diagram.md <- Diagram for exercise 0.4
├── 05-SinglePageApp-diagram.md <- Diagram for exercise 0.5
└── 06-NewNoteSPA-diagram.md <- Diagram for exercise 0.6
```

---


## 📜 Notes

The diagrams illustrate how HTTP communication works in both traditional web apps and SPA style applications.

---

## License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.


