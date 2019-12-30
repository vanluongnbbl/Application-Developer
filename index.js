const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const passport = require('./controllers/passport')
const path = require('path')
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'fonts')))
app.use(express.static(path.join(__dirname, 'vendor')))
app.use(express.static(path.join(__dirname, 'js')))



let controller_index = require('./controllers/index')
let controller_logIn = require('./controllers/login')
let controller_logOut = require('./controllers/logout')

app.get('/', controller_index)

app.get('/login', controller_logIn.logIn_form)
app.post('/login', controller_logIn.logIn_query, passport.authenticate('jwt', { session: true }, (req, res) => {
    res.send('Login Successful!')
}))

app.get('/logout', controller_logOut)

let controller_list_trainee = require('./controllers/list/list-trainee')
let controller_list_coach = require('./controllers/list/list-coach')
let controller_list_course = require('./controllers/list/list-course')
let controller_list_topic = require('./controllers/list/list-topic')
let controller_list_staff = require('./controllers/list/list-staff')

app.get('/view/list/trainee', controller_list_trainee)
app.get('/view/list/coach', controller_list_coach)
app.get('/view/list/course', controller_list_course)
app.get('/view/list/topic', controller_list_topic)
app.get('/view/list/staff', controller_list_staff)

let controller_add_trainee = require('./controllers/add/add-trainee')
let controller_add_coach = require('./controllers/add/add-coach')
let controller_add_staff = require('./controllers/add/add-staff')
let controller_add_topic = require('./controllers/add/add-topic')
let controller_add_course = require('./controllers/add/add-course')

app.get('/admin/add/trainee', controller_add_trainee.signUp_form)
app.post('/admin/add/trainee', controller_add_trainee.signUp_query)

app.get('/admin/add/coach', controller_add_coach.signUp_form)
app.post('/admin/add/coach', controller_add_coach.signUp_query)

app.get('/admin/add/staff', controller_add_staff.signUp_form)
app.post('/admin/add/staff', controller_add_staff.signUp_query)

app.get('/admin/add/course', controller_add_course.signUp_form)
app.post('/admin/add/course', controller_add_course.signUp_query)

app.get('/admin/add/topic', controller_add_topic.signUp_form)
app.post('/admin/add/topic', controller_add_topic.signUp_query)

let controller_delete_topic = require('./controllers/delete/delete-topic')
let controller_delete_coach = require('./controllers/delete/delete-coach')
let controller_delete_course = require('./controllers/delete/delete-course')
let controller_delete_trainee = require('./controllers/delete/delete-trainee')
let controller_delete_staff = require('./controllers/delete/delete-staff')

app.get('/staff/delete-topic/:id', controller_delete_topic)
app.get('/staff/delete-coach/:id', controller_delete_coach)
app.get('/staff/delete-course/:id', controller_delete_course)
app.get('/staff/delete-trainee/:id', controller_delete_trainee)
app.get('/staff/delete-staff/:id', controller_delete_staff)

let controller_update_topic = require('./controllers/update/update-topic')
let controller_update_coach = require('./controllers/update/update-coach')
let controller_update_course = require('./controllers/update/update-course')
let controller_update_trainee = require('./controllers/update/update-trainee')
let controller_update_staff = require('./controllers/update/update-staff')

app.get('/staff/update-topic/:id', controller_update_topic.get)
app.post('/staff/update-topic/:id', controller_update_topic.post)

app.get('/staff/update-coach/:id', controller_update_coach.get)
app.post('/staff/update-coach/:id', controller_update_coach.post)

app.get('/staff/update-course/:id', controller_update_course.get)
app.post('/staff/update-course/:id', controller_update_course.post)

app.get('/staff/update-trainee/:id', controller_update_trainee.get)
app.post('/staff/update-trainee/:id', controller_update_trainee.post)

app.get('/staff/update-staff/:id', controller_update_staff.get)
app.post('/staff/update-staff/:id', controller_update_staff.post)

let controller_list_enrollment = require('./controllers/list/list-enrollment')
let controller_add_enrollment = require('./controllers/add/add-enrollment')
let controller_delete_enrollment = require('./controllers/delete/delete-enrollment')
let controller_update_enrollment = require('./controllers/update/update-enrollment')

app.get('/staff/list/enrollment', controller_list_enrollment.get)

app.get('/staff/add/enrollment', controller_add_enrollment.signUp_form)
app.post('/staff/add/enrollment', controller_add_enrollment.signUp_query)

app.get('/staff/delete/enrollment/:id', controller_delete_enrollment)

app.get('/staff/update/enrollment/:id', controller_update_enrollment.get)
app.post('/staff/update/enrollment/:id', controller_update_enrollment.post)

app.get('/staff/list-enrollment/:id', controller_list_enrollment.getById)

app.listen(3000, () => {
    console.log('App running...')
})