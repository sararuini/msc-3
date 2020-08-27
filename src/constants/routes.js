// routes to different applications
export const LANDING = "/";
export const HOME = "/home";
export const PASSWORD_FORGET = "/pw-forget";

//accessing app (auth)
export const SIGN_UP = "/signup";
export const SIGN_IN = "/signin";

// profiles
export const EDIT_PROFILE = "/profile/edit";
export const OWN_PROFILE = "/profile";
export const USERS = "/users";
export const USER_PROFILE = "/users/:id";


//settings
export const SETTINGS = "/settings";

//messenger
//export const CHATS = "/chats";
//export const CHAT = "chats/:id";
//export const USER_CHATS = "/users/:id/chats";

// connections
export const CONNECTIONS = "/connections"
export const USER_CONNECTIONS = "/connections/my_connections"
export const CONNECTION_REQUESTS = "/connections/connection_requests"

//opportunities
export const OPPORTUNITIES= "/opportunities";
export const OPPORTUNITIES_AVAILABLE= "/opportunities/available";
export const OPPORTUNITY = "/opportunities/:id/";
export const OPPORTUNITY_PROFILE = "/opportunities/:id/profile";
export const OPPORTUNITIES_SAVED = "/opportunities/saved";
export const OPPORTUNITIES_APPLIED = "/opportunities/applied";
export const OPPORTUNITIES_PUBLISHED= "/opportunities/published";

//notifications
export const NOTIFICATIONS= "/notifications"
export const NOTIFICATION = "/notifications/:id"

//bands
export const BANDS = "/bands";
export const BAND = "/bands/:id";
export const BAND_EDIT = "/bands/:id/edit";
export const USER_BANDS = "/bands/user"

//events
export const EVENTS = "/events";
export const EVENT = "/events/:id";
export const EVENT_EDIT = "/events/:id/edit";
export const USER_EVENTS = "/events/user"