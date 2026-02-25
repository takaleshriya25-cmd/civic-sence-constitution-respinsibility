const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let reports = [];

app.post('/submit-report', upload.single('video'), (req, res) => {
    const report = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        time: new Date().toLocaleString()
    };

    reports.push(report);
    res.json({ message: "Complaint Submitted Successfully!" });
});

app.get('/get-reports', (req, res) => {
    res.json(reports);
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});