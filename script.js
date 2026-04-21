// INITIAL USERS
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
      { username: "admin", password: "123", role: "admin" }
    ]));
  }
  
  // LOGIN
  function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  }
  
  // SIGNUP
  function signup() {
    let username = document.getElementById("newUser").value;
    let password = document.getElementById("newPass").value;
    let role = document.getElementById("role").value;
  
    let users = JSON.parse(localStorage.getItem("users"));
    users.push({ username, password, role });
  
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
  }
  
  // DASHBOARD ACCESS
  function checkAccess() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!user) window.location.href = "index.html";
  
    if (user.role !== "admin") {
      document.getElementById("adminBtn").style.display = "none";
    }
  }
  
  // NAVIGATION
  function goToCourses() {
    window.location.href = "courses.html";
  }
  
  function goToAdmin() {
    window.location.href = "admin.html";
  }
  
  function goBack() {
    window.location.href = "dashboard.html";
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }
  
  // COURSES
  function loadCourses() {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let list = document.getElementById("courseList");
  
    list.innerHTML = "";
  
    courses.forEach((course, index) => {
      let div = document.createElement("div");
      div.className = "course";
  
      div.innerHTML = `
        <h3>${course.title}</h3>
        <button onclick="openCourse(${index})">View</button>
      `;
  
      list.appendChild(div);
    });
  }
  
  function openCourse(index) {
    localStorage.setItem("selectedCourse", index);
    window.location.href = "player.html";
  }
  
  // PLAYER
  function loadPlayer() {
    let courses = JSON.parse(localStorage.getItem("courses"));
    let index = localStorage.getItem("selectedCourse");
  
    let course = courses[index];
  
    document.getElementById("courseTitle").innerText = course.title;
    document.getElementById("courseContent").innerText = course.content;
  }
  
  // ADMIN
  function checkAdmin() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!user || user.role !== "admin") {
      alert("Access Denied");
      window.location.href = "dashboard.html";
    }
  
    loadAdminCourses();
  }
  
  function addCourse() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
  
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
  
    courses.push({ title, content });
  
    localStorage.setItem("courses", JSON.stringify(courses));
  
    alert("Course Added!");
    loadAdminCourses();
  }
  
  function loadAdminCourses() {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let div = document.getElementById("adminCourses");
  
    div.innerHTML = "";
  
    courses.forEach((course, index) => {
      div.innerHTML += `
        <div class="course">
          <h4>${course.title}</h4>
          <button onclick="deleteCourse(${index})">Delete</button>
        </div>
      `;
    });
  }
  
  function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem("courses"));
  
    courses.splice(index, 1);
  
    localStorage.setItem("courses", JSON.stringify(courses));
    loadAdminCourses();
  }
  