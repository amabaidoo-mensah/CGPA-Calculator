// COLLECTING USER INPUT

const level = document.getElementById("level");
const semester = document.getElementById("semester");

const courseCode = document.getElementById("CC");
const courseName = document.getElementById("CN");
const creditPoints = document.getElementById("CH");
const grade = document.getElementById("grade");

const addCourse = document.getElementById("addcourse");
const tableBody = document.getElementById("courseTableBody");

const saveSemester = document.getElementById("saveSemester");
const newSemester = document.getElementById("newSemester");

const savedSemestersContainer =
    document.getElementById("savedSemesters");

const calculateGPA =
    document.getElementById("calculateGPA");

const calculateCGPA =
    document.getElementById("calculateCGPA");



// RESULT POPUP

const popupOverlay =
    document.getElementById("popupOverlay");

const closePopup =
    document.getElementById("closePopup");

const popupButton =
    document.getElementById("popupButton");

const resultTitle =
    document.getElementById("resultTitle");

const resultValue =
    document.getElementById("resultValue");

const resultMessage =
    document.getElementById("resultMessage");



// SHOW RESULT POPUP

function showResult(title, value, message) {

    resultTitle.textContent = title;

    resultValue.textContent = value;

    resultMessage.textContent = message;

    popupOverlay.classList.add("show");

}



// CLOSE RESULT POPUP

function closeResult() {

    popupOverlay.classList.remove("show");

}


// CLOSE BUTTON

closePopup.addEventListener(
    "click",
    closeResult
);


// POPUP CLOSE BUTTON

popupButton.addEventListener(
    "click",
    closeResult
);


// CLOSE WHEN CLICKING OUTSIDE POPUP

popupOverlay.addEventListener(
    "click",
    (event) => {

        if (event.target === popupOverlay) {

            closeResult();

        }

    }
);



// GRADE POINT FUNCTION

function getGradePoint(userGrade) {

    if (userGrade === "A") {

        return 4.0;

    }

    else if (userGrade === "B+") {

        return 3.5;

    }

    else if (userGrade === "B") {

        return 3.0;

    }

    else if (userGrade === "C+") {

        return 2.5;

    }

    else if (userGrade === "C") {

        return 2.0;

    }

    else if (userGrade === "D+") {

        return 1.5;

    }

    else if (userGrade === "D") {

        return 1.0;

    }

    else if (userGrade === "E") {

        return 0.0;

    }

    else {

        return null;

    }

}



// ADD COURSE

addCourse.addEventListener(
    "click",
    () => {

        // CHECK EMPTY FIELDS

        if (
            courseCode.value.trim() === "" ||
            courseName.value.trim() === "" ||
            creditPoints.value.trim() === "" ||
            grade.value === ""
        ) {

            alert(
                "Fill in all the course information."
            );

            return;

        }


        // GET USER INPUT

        const userCourseCode =
            courseCode.value.trim();

        const userCourseName =
            courseName.value.trim();

        const userCredit =
            Number(creditPoints.value);

        const userGrade =
            grade.value;


        // CHECK CREDIT POINTS

        if (
            userCredit !== 1 &&
            userCredit !== 2 &&
            userCredit !== 3
        ) {

            alert(
                "Credit points must be 1, 2, or 3."
            );

            return;

        }


        // CALCULATE GRADE POINT

        let gradePoint;

        let qualityPoint;


        // HANDLE IC

        if (userGrade === "IC") {

            gradePoint = null;

            qualityPoint = null;

        }

        else {

            gradePoint =
                getGradePoint(userGrade);

            qualityPoint =
                userCredit * gradePoint;

        }



        // CREATE TABLE ROW

        const newRow =
            document.createElement("tr");


        // COURSE CODE

        const codeCell =
            document.createElement("td");

        codeCell.textContent =
            userCourseCode;


        // COURSE NAME

        const nameCell =
            document.createElement("td");

        nameCell.textContent =
            userCourseName;


        // CREDIT POINTS

        const creditCell =
            document.createElement("td");

        creditCell.textContent =
            userCredit;


        // GRADE

        const gradeCell =
            document.createElement("td");

        gradeCell.textContent =
            userGrade === "IC"
                ? "IC / Grade Pending"
                : userGrade;


        // GRADE POINT

        const gradePointCell =
            document.createElement("td");


        // QUALITY POINT

        const qualityPointCell =
            document.createElement("td");


        // ACTION

        const actionCell =
            document.createElement("td");


        // DISPLAY GRADE POINT

        if (gradePoint === null) {

            gradePointCell.textContent =
                "—";

            qualityPointCell.textContent =
                "—";

        }

        else {

            gradePointCell.textContent =
                gradePoint.toFixed(1);

            qualityPointCell.textContent =
                qualityPoint.toFixed(1);

        }



        // ADD CELLS TO ROW

        newRow.appendChild(
            codeCell
        );

        newRow.appendChild(
            nameCell
        );

        newRow.appendChild(
            creditCell
        );

        newRow.appendChild(
            gradeCell
        );

        newRow.appendChild(
            gradePointCell
        );

        newRow.appendChild(
            qualityPointCell
        );

        newRow.appendChild(
            actionCell
        );



        // REMOVE BUTTON

        const removeButton =
            document.createElement("button");

        removeButton.textContent =
            "Remove";

        removeButton.classList.add(
            "remove-btn"
        );


        removeButton.addEventListener(
            "click",
            () => {

                newRow.remove();

            }
        );


        actionCell.appendChild(
            removeButton
        );



        // ADD ROW TO TABLE

        tableBody.appendChild(
            newRow
        );



        // CLEAR INPUTS

        courseCode.value = "";

        courseName.value = "";

        creditPoints.value = "";

        grade.value = "";

    }
);



// GET CURRENT COURSES

function getCurrentCourses() {

    const rows =
        tableBody.querySelectorAll("tr");

    const courses = [];


    rows.forEach(
        (row) => {

            const course = {

                code:
                    row.cells[0].textContent,

                name:
                    row.cells[1].textContent,

                credit:
                    Number(
                        row.cells[2].textContent
                    ),

                grade:
                    row.cells[3].textContent,

                gradePoint:
                    row.cells[4].textContent,

                qualityPoint:
                    row.cells[5].textContent

            };


            courses.push(course);

        }
    );


    return courses;

}



// CALCULATE SEMESTER TOTALS

function calculateSemesterTotals(courses) {

    let totalCreditPoints = 0;

    let totalQualityPoints = 0;

    let incompleteCourse = false;


    courses.forEach(
        (course) => {

            // SKIP IC COURSES

            if (
                course.grade ===
                "IC / Grade Pending"
            ) {

                incompleteCourse = true;

                return;

            }


            totalCreditPoints +=
                course.credit;


            totalQualityPoints +=
                Number(
                    course.qualityPoint
                );

        }
    );


    let gpa = 0;


    if (totalCreditPoints > 0) {

        gpa =
            totalQualityPoints /
            totalCreditPoints;

    }


    return {

        totalCreditPoints,

        totalQualityPoints,

        gpa,

        incompleteCourse

    };

}



// CALCULATE GPA

calculateGPA.addEventListener(
    "click",
    () => {

        const courses =
            getCurrentCourses();


        // NO COURSES

        if (courses.length === 0) {

            alert(
                "Please add at least one course."
            );

            return;

        }


        const result =
            calculateSemesterTotals(
                courses
            );


        // NO COMPLETED COURSES

        if (
            result.totalCreditPoints === 0
        ) {

            alert(
                "There are no completed courses available for GPA calculation."
            );

            return;

        }


        // SHOW POPUP

        if (result.incompleteCourse) {

            showResult(
                "GPA Result",
                result.gpa.toFixed(2),
                "Courses with IC / Grade Pending were not included."
            );

        }

        else {

            showResult(
                "GPA Result",
                result.gpa.toFixed(2),
                "Your semester GPA has been calculated."
            );

        }

    }
);



// GET SAVED SEMESTERS

function getSavedSemesters() {

    const saved =
        localStorage.getItem(
            "cgpaSemesters"
        );


    if (saved === null) {

        return [];

    }


    return JSON.parse(saved);

}



// SAVE SEMESTERS

function saveSemesters(semesters) {

    localStorage.setItem(
        "cgpaSemesters",
        JSON.stringify(semesters)
    );

}



// SAVE CURRENT SEMESTER

saveSemester.addEventListener(
    "click",
    () => {

        // CHECK SEMESTER INFORMATION

        if (
            level.value === "" ||
            semester.value === ""
        ) {

            alert(
                "Select your level and semester."
            );

            return;

        }


        // GET COURSES

        const courses =
            getCurrentCourses();


        // CHECK COURSES

        if (courses.length === 0) {

            alert(
                "Please add at least one course before saving the semester."
            );

            return;

        }


        // CALCULATE SEMESTER RESULTS

        const result =
            calculateSemesterTotals(
                courses
            );


        // GET SAVED SEMESTERS

        const semesters =
            getSavedSemesters();


        // CHECK IF SEMESTER ALREADY EXISTS

        const existingSemester =
            semesters.findIndex(
                (item) =>
                    item.level === level.value &&
                    item.semester === semester.value
            );


        // CREATE SEMESTER RECORD

        const semesterRecord = {

            id:
                Date.now(),

            level:
                level.value,

            semester:
                semester.value,

            courses:
                courses,

            totalCreditPoints:
                result.totalCreditPoints,

            totalQualityPoints:
                result.totalQualityPoints,

            gpa:
                result.gpa,

            incompleteCourse:
                result.incompleteCourse

        };


        // UPDATE EXISTING SEMESTER

        if (existingSemester !== -1) {

            const confirmUpdate =
                confirm(
                    "This semester already exists. Do you want to replace the saved record?"
                );


            if (!confirmUpdate) {

                return;

            }


            semesters[existingSemester] =
                semesterRecord;

        }


        // ADD NEW SEMESTER

        else {

            semesters.push(
                semesterRecord
            );

        }


        // SAVE TO LOCAL STORAGE

        saveSemesters(
            semesters
        );


        // UPDATE DISPLAY

        displaySavedSemesters();


        // CONFIRMATION

        alert(
            `${level.value} - ${semester.value} has been saved.`
        );

    }
);



// DISPLAY SAVED SEMESTERS

function displaySavedSemesters() {

    const semesters =
        getSavedSemesters();


    savedSemestersContainer.innerHTML =
        "";


    // NO SAVED SEMESTERS

    if (semesters.length === 0) {

        savedSemestersContainer.innerHTML = `

            <div class="emptySaved">

                No semesters saved yet.

            </div>

        `;

        return;

    }


    // DISPLAY EACH SEMESTER

    semesters.forEach(
        (record) => {

            const semesterCard =
                document.createElement("div");

            semesterCard.classList.add(
                "savedSemester"
            );


            // SEMESTER INFORMATION

            const semesterInfo =
                document.createElement("div");

            semesterInfo.classList.add(
                "savedSemesterInfo"
            );


            // HEADING

            const heading =
                document.createElement("h5");

            heading.textContent =
                `${record.level} • ${record.semester}`;


            // DETAILS

            const details =
                document.createElement("p");

            details.textContent =
                `${record.courses.length} course(s) • ` +
                `${record.totalCreditPoints} CP`;


            semesterInfo.appendChild(
                heading
            );

            semesterInfo.appendChild(
                details
            );


            // GPA SECTION

            const savedGpa =
                document.createElement("div");

            savedGpa.classList.add(
                "savedGpa"
            );


            // GPA TEXT

            const gpaText =
                document.createElement("strong");

            gpaText.textContent =
                `GPA: ${record.gpa.toFixed(2)}`;


            // DELETE BUTTON

            const deleteButton =
                document.createElement("button");

            deleteButton.classList.add(
                "deleteSemester"
            );


            deleteButton.innerHTML =
                `<i class="fa-solid fa-trash"></i>`;


            deleteButton.addEventListener(
                "click",
                () => {

                    const confirmDelete =
                        confirm(
                            "Delete this saved semester?"
                        );


                    if (!confirmDelete) {

                        return;

                    }


                    deleteSavedSemester(
                        record.id
                    );

                }
            );


            savedGpa.appendChild(
                gpaText
            );

            savedGpa.appendChild(
                deleteButton
            );


            // ADD EVERYTHING TO CARD

            semesterCard.appendChild(
                semesterInfo
            );

            semesterCard.appendChild(
                savedGpa
            );


            savedSemestersContainer.appendChild(
                semesterCard
            );

        }
    );

}



// DELETE SAVED SEMESTER

function deleteSavedSemester(id) {

    let semesters =
        getSavedSemesters();


    semesters =
        semesters.filter(
            (semester) =>
                semester.id !== id
        );


    saveSemesters(
        semesters
    );


    displaySavedSemesters();

}



// NEW SEMESTER

newSemester.addEventListener(
    "click",
    () => {

        level.value = "";

        semester.value = "";


        tableBody.innerHTML =
            "";


        courseCode.value = "";

        courseName.value = "";

        creditPoints.value = "";

        grade.value = "";


        alert(
            "Ready for a new semester."
        );

    }
);



// CALCULATE CGPA

calculateCGPA.addEventListener(
    "click",
    () => {

        const semesters =
            getSavedSemesters();


        // NO SAVED SEMESTERS

        if (semesters.length === 0) {

            alert(
                "Please save at least one semester before calculating CGPA."
            );

            return;

        }


        let totalCreditPoints = 0;

        let totalQualityPoints = 0;

        let incompleteCourse = false;


        // LOOP THROUGH SEMESTERS

        semesters.forEach(
            (record) => {

                totalCreditPoints +=
                    record.totalCreditPoints;


                totalQualityPoints +=
                    record.totalQualityPoints;


                if (
                    record.incompleteCourse
                ) {

                    incompleteCourse = true;

                }

            }
        );


        // CHECK COMPLETED COURSES

        if (totalCreditPoints === 0) {

            alert(
                "There are no completed courses available for CGPA calculation."
            );

            return;

        }


        // CALCULATE CGPA

        const cgpa =
            totalQualityPoints /
            totalCreditPoints;


        // SHOW POPUP

        if (incompleteCourse) {

            showResult(
                "CGPA Result",
                cgpa.toFixed(2),
                `Based on ${semesters.length} saved semester(s). Courses with IC / Grade Pending were not included.`
            );

        }

        else {

            showResult(
                "CGPA Result",
                cgpa.toFixed(2),
                `Your CGPA is based on ${semesters.length} saved semester(s).`
            );

        }

    }
);



// LOAD SAVED SEMESTERS WHEN PAGE OPENS

displaySavedSemesters();