# Project Support

### UFam

## Summary

### Project Idea:
-  Our project involves developing a private family social media platform, tailored to create a safe and interactive online environment for families. Similar to popular social networks but focused on family connections, users can create personal profiles, share experiences, and maintain a digital diary of family moments. What sets our platform apart is its emphasis on children's digital education and parental involvement. Families can document and share their journey, from daily activities to special events, fostering a strong sense of community. This platform serves as a hub for families to connect, learn, and grow together in the digital age, ensuring a safe space for children to engage with social media under parental guidance. Our goal is to be the foremost family-oriented social media space, where experiences are shared, and lasting bonds are nurtured.

Roles: There will be 3 main roles:

- Admin:
    - Manages the entire platform.
    - Access to all administrative functions, such as content moderation, user account management, data analysis, etc.

- Master:
    - Unique account from family account set up.
    - Supervision and control of their children's accounts.
    - Access to tools for managing the privacy and security of their children's accounts.
    - Ability to view and moderate content shared by their children.

- Users:
    - Limited access compared to master.
    - Features focused on safe interaction, learning, and educational entertainment.
    - Ability to share and interact within a controlled environment.

### Tables:

<img width="1931" alt="Tables" src="https://github.com/Famblablap/UrFam_back/assets/141185519/55ce0f63-ba25-4ede-8417-86e0d9db31fc">

### UFam Features
- Interactive Feed: Posts, Like and Comment Features, Friends and Relatives List, User Profiles, Direct Messaging
- Navigational Left Sidebar: Home, Photo Gallery, Video Library, Resource Links, Message Center, Notification Alerts
- Functional Right Sidebar: User Directory
- Website Footer: Copyright Information, Company Overview, Privacy Practices, Cookie Usage Policy
- Birthday Notification System
- Early Childhood Education in New Technologies
- Providing a Controlled Environment for Children's Social Media Use
- Developing a Social Network Focused on Local Community Engagement
- Promoting Best Practices and Responsible Social Media Usage
- Facilitating Relationship Building
- Enhancing Digital and Personal Skill Development
  
## Upcoming features
- Anti-Bullying Measures in Schools
- Strengthening Community Cohesion Within School Groups
- Offering a Platform for Teachers to Monitor Students' Digital Behavior
- Managing Negligent or Inappropriate Online Behaviors
- Social Event Planner with Calendar and Availability Features
- Integrated Geolocation Services

### Relationships between tables:

#### One to many:
- Ref: "users"."user_id" < "photos"."user_id"
- Ref: "users"."user_id" < "videos"."user_id"
- Ref: "users"."user_id" < "likes"."user_id"
- Ref: "photos"."photo_id" < "likes"."photo_id"
- Ref: "videos"."video_id" < "likes"."video_id"
- Ref: "messages"."sender_id" > "users"."user_id"
- Ref: "messages"."receiver_id" > "users"."user_id"
- Ref: "notifications"."user_id" > "users"."user_id"
- Ref: "families"."user_id" < "users"."user_id"
- Ref: "users"."user_id" < "blogs"."blog"

#### Many to many
- Ref: "users"."user_id" <> "comments_videos"."user_id"
- Ref: "videos"."video_id" <> "comments_videos"."video_id"
- Ref: "users"."user_id" <> "comments_photos"."user_id"
- Ref: "comments_photos"."photo_id" <> "photos"."photo_id"

### Authentication Endpoints
The Authentication flow for the application is:



## Endpoints

###  Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------

POST   | /auth/signup     | -     | master/admin | User Signup              | `name`, `email`, `dob`, `password` | { user_id, name, email }
POST   | /auth/login      | YES     | user/admin | User Login               | `email`, `password`                             | { token: `token` }


### Families Endpoints
METHOD | ENDPOINT                | TOKEN | ROLE      | DESCRIPTION                  | POST PARAMS               | RETURNS
-------|-------------------------|-------|-----------|------------------------------|---------------------------|--------------------
POST   | /api/families           | YES   | user      | Create a family              | `family_name`                 | { family_id }
GET    | /api/families/:id       | YES   | user      | Get family by id             | -                         | { family }
GET    | /api/families           | YES   | user      | Get all families             | -                         | [{ families }]
PUT    | /api/families/:id       | YES   | user      | Update family details        | `user_id`                 | { message: 'Family updated' }
DELETE | /api/families/:id       | YES   | user      | Delete family                | -                         | { message: 'Family deleted' }


### User Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE      | DESCRIPTION                | POST PARAMS                                               | RETURNS
-------|------------------------|-------|-----------|----------------------------|-----------------------------------------------------------|--------------------
POST   | /api/users/signup      | NO    | -         | User Signup                | `name`, `email`, `dob`, `password`, `profile_picture`      | { user_id, name, email }
POST   | /api/users/login       | NO    | -         | User Login                 | `email`, `password`                                       | { token: `token` }
GET    | /api/users             | YES   | admin     | Get all users              | -                                                         | [{ users }]
GET    | /api/users/:id         | YES   | user      | Get user by id             | -                                                         | { user }
PUT    | /api/users/:id         | YES   | user      | Edit user profile          | `name`, `email`, `dob`, `password`, `profile_picture`      | { message: 'User updated' }
DELETE | /api/users/:id         | YES   | user      | Delete user account        | -                                                         | { message: 'User deleted' }

### Master Endpoints

METHOD | ENDPOINT                 | TOKEN | ROLE     | DESCRIPTION                | POST PARAMS                                               | RETURNS
-------|--------------------------|-------|----------|----------------------------|-----------------------------------------------------------|--------------------
POST   | /api/master/kids        | YES   | master   | Create kid account         | `name`, `dob`, `profile_picture`                           | { kid_user_id, name }
GET    | /api/master/kids        | YES   | master   | Get all kids               | -                                                         | [{ kids }]
PUT    | /api/master/kids/:kidId | YES   | master   | Update kid's account       | `name`, `dob`, `profile_picture`                           | { message: 'Kid updated' }
DELETE | /api/master/kids/:kidId | YES   | master   | Delete kid's account       | -                                                         | { message: 'Kid deleted' }

### Kids Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE      | DESCRIPTION               | POST PARAMS                          | RETURNS
-------|------------------------|-------|-----------|---------------------------|--------------------------------------|--------------------
POST   | /api/user/photos       | YES   | user       | Upload photo by kid       | `image_url`                          | { photo }
POST   | /api/kids/videos       | YES   | user      | Upload video by kid       | `video_url`                          | { video }
GET    | /api/kids/messages     | YES   | user       | Get messages for a kid    | -                                    | [{ messages }]
POST   | /api/kids/messages     | YES   | user       | Send a message by a kid   | `receiver_id`, `message`             | { message }

### Comments Endpoints

METHOD | ENDPOINT                     | TOKEN | ROLE      | DESCRIPTION                  | POST PARAMS                          | RETURNS
-------|------------------------------|-------|-----------|------------------------------|--------------------------------------|--------------------
POST   | /api/comments/photos         | YES   | user      | Post a comment on a photo    | `comment_text`, `user_id`, `photo_id` | { comment }
GET    | /api/comments/photos/:id     | YES   | user      | Get photo comment by id      | -                                     | { comment }
DELETE | /api/comments/photos/:id     | YES   | user      | Delete photo comment         | -                                     | { message: 'Comment deleted' }
POST   | /api/comments/videos         | YES   | user      | Post a comment on a video    | `comment_text`, `user_id`, `video_id` | { comment }
GET    | /api/comments/videos/:id     | YES   | user      | Get video comment by id      | -                                     | { comment }
DELETE | /api/comments/videos/:id     | YES   | user      | Delete video comment         | -                                     | { message: 'Comment deleted' }

### Photos Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE      | DESCRIPTION                | POST PARAMS                          | RETURNS
-------|------------------------|-------|-----------|----------------------------|--------------------------------------|--------------------
POST   | /api/photos            | YES   | user      | Upload a photo             | `image_url`, `user_id`               | { photo }
GET    | /api/photos/:id        | YES   | user      | Get photo by id            | -                                    | { photo }
GET    | /api/photos            | YES   | user/admin | Get all photos              | -                                    | [{ photos }]
PUT    | /api/photos/:id        | YES   | user      | Update photo details       | `image_url`                          | { message: 'Photo updated' }
DELETE | /api/photos/:id        | YES   | user      | Delete photo               | -                                    | { message: 'Photo deleted' }

### Videos Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE      | DESCRIPTION                | POST PARAMS                          | RETURNS
-------|------------------------|-------|-----------|----------------------------|--------------------------------------|--------------------
POST   | /api/videos            | YES   | user      | Upload a video             | `video_url`, `user_id`               | { video }
GET    | /api/videos/:id        | YES   | user      | Get video by id            | -                                    | { video }
GET    | /api/videos            | YES   | user      | Get all videos             | -                                    | [{ videos }]
PUT    | /api/videos/:id        | YES   | user      | Update video details       | `video_url`                          | { message: 'Video updated' }
DELETE | /api/videos/:id        | YES   | user      | Delete video               | -                                    | { message: 'Video deleted' }

### Likes Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE     | DESCRIPTION                | POST PARAMS                          | RETURNS
-------|------------------------|-------|----------|----------------------------|--------------------------------------|--------------------
GET    | /api/likes             | YES   | user     | Get all likes              | -                                    | [{ likes }]
POST   | /api/likes             | YES   | user     | Like a photo/video         | `user_id`, `photo_id`, `video_id`    | { like }
DELETE | /api/likes/:id         | YES   | user     | Remove a like              | -                                    | { message: 'Like removed' }

### Messages Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE     | DESCRIPTION                | POST PARAMS                          | RETURNS
-------|------------------------|-------|----------|----------------------------|--------------------------------------|--------------------
GET    | /api/messages          | YES   | user     | Get all messages           | -                                    | [{ messages }]
GET    | /api/messages/:id      | YES   | user     | Get message by id          | -                                    | { message }
POST   | /api/messages          | YES   | user     | Send a new message         | `sender_id`, `receiver_id`, `message` | { message }
PUT    | /api/messages/:id      | YES   | user     | Update a message           | `message`                            | { message: 'Message updated' }
DELETE | /api/messages/:id      | YES   | user     | Delete a message           | -                                    | { message: 'Message deleted' }

### Notifications Endpoints

METHOD | ENDPOINT                 | TOKEN | ROLE      | DESCRIPTION                  | POST PARAMS                                                        | RETURNS
-------|--------------------------|-------|-----------|------------------------------|--------------------------------------------------------------------|--------------------
POST   | /api/notifications       | YES   | user      | Create a notification        | `user_id`, `content`, `video_id`, `photo_id`, `comment_id`, `like_id`, `blog_id` | { notification }
GET    | /api/notifications/:id   | YES   | user      | Get notification by id       | -                                                                  | { notification }
DELETE | /api/notifications/:id   | YES   | user      | Delete a notification        | -                                                                  | { message: 'Notification deleted' }

### Blog Endpoints

METHOD | ENDPOINT               | TOKEN | ROLE      | DESCRIPTION                | POST PARAMS                          | RETURNS
-------|------------------------|-------|-----------|----------------------------|--------------------------------------|--------------------
POST   | /api/blogs             | YES   | user      | Create a blog              | `user_id`, `blog`                    | { blog }
GET    | /api/blogs/:id         | YES   | user      | Get blog by id             | -                                    | { blog }
GET    | /api/blogs             | YES   | user      | Get all blogs              | -                                    | [{ blogs }]
PUT    | /api/blogs/:id         | YES   | user      | Update blog details        | `blog`                               | { message: 'Blog updated' }
DELETE | /api/blogs/:id         | YES   | user      | Delete blog                | -                                    | { message: 'Blog deleted' }
