## Trying to build a social media app using MERN

- After failing to build a social media app using MERN earlier(disastrous architecture),here is a new improved version of it
- Hosted [here](https://social-media-app-vild.onrender.com/)

### Some goals with the project

- Make the frontend and backend architecture as clean as possible( the whole ideation document coming soon)
- Adopt better practices(proper API endpoint names,Better Components(adhering to the idea(every component must serve an independent functionality, last time messed up some states and the project had a million window.location.reload() )),Better design system and conventions, organized css etc)

### Features

- Registration and Login of users using their email as well as facebook auth(if everything goes well might add google and github auth as well, who knows :) :) )
- Create, Delete, Edit, Like and Comment on posts, similar functionality for the comments
- Ability to follow users
- Infinite scroll(Hopefully)
- Messaging using sockets(Less priority)
- Search users
- Randomized feed(Less priority)
- Forgot Password

### PROGRESS

- User can login,see posts of the people he follows, like and comment


- TODO:
  - Replace heavy prop drilling with context/redux-toolkit(also optimistic rendering for comments)
  - Profile page(will have to implement follow user and edit profile with regards to backend)
  - In profile page how to make the expandedPostModal work.
  - This will be version 1 of the project
  - Host on heroku/netlify and ask people to upload photos
  - Once there are enough photos, randomized feed with infinite scroll and sockets for realtime messaging and notifications
  - Facebook Auth(easy enough)[check how instagram onboards people after fb auth]


- Follow, unfollow live reload
- Use react query


### CREDITS
-https://github.com/DominicTobias/react-image-crop(For the image crop function)
