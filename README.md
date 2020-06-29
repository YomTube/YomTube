# YomTube

Man behöver sätta sina egna saker i `.env` filen.  
Tro mig, det funkar bara.

## To Do

- [x] JWT Content
- [ ] Session handling
- [ ] Working search bar
- [ ] Sidebar
- [ ] Subscriptions
- [ ] Lazy loading
- [ ] Notifications
- [ ] Fix related videos
- [ ] Themes
- [ ] Upscaling
- [ ] Password reset
- [ ] reCAPTCHA

## Vid clone eller pull

Kör `npm run setup`, den lägger till testdata i mongoDB.

### Test User

| ID                         | Username    | Email                   | Password                  | Token                                                                                                                                                   |
| -------------------------- | ----------- | ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `5e46d2dc2729694cb256aab0` | John Doe    | john.doe@example.com    | Password123               | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQ2ZDJkYzI3Mjk2OTRjYjI1NmFhYjAiLCJpYXQiOjE1ODE2OTk4MDR9.9hh39UiKFjUKF9f_ngcLwmTSyyBf12qVCJr3Ch8XbEk` |
| `5e4702013b9f0d1ebbc8b5e7` | Clean Clown | clean.clown@yomtube.com | CleanCodeIsUnderrated2009 | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQ3MDIwMTNiOWYwZDFlYmJjOGI1ZTciLCJpYXQiOjE1ODE3MTE4NzN9.LKma-41HWCJpkOg6wxzJGWY0vcUqD485Q84QKZyUmqU` |

### Test Videos

| ID                         | Uploader ID                | Title            | Desc                  |
| -------------------------- | -------------------------- | ---------------- | --------------------- |
| `5e4702edcea6a6216e41dfdb` | `5e4702013b9f0d1ebbc8b5e7` | Kenneth Agenneth | Kent Agent test video |
