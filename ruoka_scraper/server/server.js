const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ['userOne', 'userTwo', 'userThree']})
})

app.post("/api/items", (req, res) => {
    console.log(req.body)
    res.json({"message": "items submitted"})
})

app.listen(5000, () => { console.log('Server started on port 5000') })