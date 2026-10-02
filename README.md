# CGPA Calculator

A simple and user-friendly CGPA Calculator built with HTML, CSS, and JavaScript. It allows students to add their courses, credit points, and grades, calculate their semester GPA, save semester records, and calculate their overall CGPA.

## Live Demo

[View the Live CGPA Calculator](https://ama-cgpa-calculator-2026.netlify.app/)

## Features

* Add courses with course code and course name
* Enter credit points and grades
* Automatically calculate grade points
* Calculate semester GPA
* Save semester records
* View previously saved semesters
* Delete saved semester records
* Calculate overall CGPA from saved semesters
* Support for incomplete (IC) courses
* Store saved semester records using browser `localStorage`
* Responsive and clean user interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Font Awesome
* Browser `localStorage`

## How It Works

The calculator uses the credit points and grade points of each course to calculate the semester GPA.

**GPA = Total Quality Points ÷ Total Credit Points**

The CGPA is calculated using the combined quality points and credit points from all saved semesters.

**CGPA = Total Quality Points from all semesters ÷ Total Credit Points from all semesters**

## Data Storage

Saved semester records are stored in the browser using `localStorage`.

This means the saved records remain available on the same browser and device unless the browser's site data is cleared.

The current version does not use a database or user account, so saved records do not automatically sync across different devices or browsers.

## 📁 Project Structure

```text
CGPA-Calculator/
│
├── index.html
├── style.css
├── action.js
└── README.md
```

## 🔮 Future Improvements

* Add student profile information
* Add academic year and semester history management
* Add downloadable academic records
* Add PDF export
* Add user accounts
* Add cloud database storage
* Add support for multiple grading systems
* Improve mobile responsiveness

## Author

**Ama Baidoo-Mensah**

Computer Science Student | Front-End Developer

---

If you find this project useful, feel free to explore the code and try the live calculator.
