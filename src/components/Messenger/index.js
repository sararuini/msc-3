/*import React from "react";
import { withFirebase } from "../Firebase";
import { v4 as uuidv4 } from 'uuid';


const ConversationPage = () => {
  const [userId, users] = useAuth();
  const {
    activeConversations,
    setCurrentConversation,
    createConversation,
    sendMessage,
    currentConversation,
    currentConversationMessages,
  } = useChats(userId);

  return (
    <div>
      <p> {userId} conversations</p>
      <ActiveConversations
        setCurrentConversation={setCurrentConversation}
        activeConversations={activeConversations}
      />
      <CreateConversation
        createConversation={createConversation}
        users={users.filter((user) => user !== userId)}
      />
      {currentConversation && (
        <ChatWindow
          sendMessage={sendMessage}
          currentConversation={currentConversation}
          messages={currentConversationMessages}
        />
      )}
    </div>
  );
};

const getFromDatabase = (dbString, callback) => {
  const ref = this.props.firebase.ref(dbString);

  ref.on("value", (snapshot) => {
    if (snapshot.val()) {
      callback(snapshot.val());
    }
  });
};

const saveToDatabase = (dbString, val) => {
  this.props.firebase.ref(dbString).set(val);
};

const useChats = (userId) => {
  const [currentConversation, setCurrentConversation] = React.useState(null);
  const [activeConversations, setActiveUserConversations] = React.useState([]);
  const [
    currentConversationMessages,
    setCurrentConversationMessages,
  ] = React.useState([]);

  React.useEffect(() => {
    getFromDatabase(`/users/${userId}/chats`, (res) => {
      setActiveUserConversations(Object.keys(res));
    });

    getFromDatabase(`/chats/${currentConversation}/messages`, (res) => {
      setCurrentConversationMessages(Object.values(res));
    });
  }, [currentConversation, userId]);

  const sendMessage = (messageObject, body) => {
    const messageId = uuidv4();
    saveToDatabase(`/chats/${messageObject}/messages/${messageId}`, {
      body,
      sender: userId,
      created: new Date().toISOString(),
    });
  };

  const createConversation = (recipient, messageObject) => {
    const fullChatName = `${messageObject}-${uuidv4()}`;
    saveToDatabase(`/${recipient}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/${userId}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/chats/${fullChatName}/messages`);
    setCurrentConversation(fullChatName);
  };
  return {
    sendMessage,
    createConversation,
    currentConversation,
    activeConversations,
    currentConversationMessages,
    setCurrentConversation,
  };
};

const useAuth = () => {
  const [userId, setUserId] = React.useState(null);
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    getUsers();
  }, []);

  const connect = (username) => {
    saveToDatabase(`/users/${username}`,true)
    setUserId(username);
  }

  const getUsers = () => {
    const users = this.props.firebase.users();
    setUsers(Object.keys(users));
    /* getFromDatabase(`/users`, res => {
      setUsers(Object.keys(res));
    })
  };

  return [userId, users];
};


const ActiveConversations = ({
  activeConversations,
  setCurrentConversation,
}) => (
  <div>
    <h3>Select an active convesation</h3>

    {activeConversations.map((conversation) => (
      <div onClick={() => setCurrentConversation(conversation)}>
        {conversation}{" "}
      </div>
    ))}
  </div>
);

const ChatWindow = ({ messages = [], sendMessage, currentConversation }) => {
  const [messageText, setMessageText] = React.useState("");

  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf()
  );

  return (
    <div>
      <div>
        {sortedMessages.map((message) => (
          <p>
            Sender: {message.sender} : Message: {message.body}
          </p>
        ))}
      </div>
      <div>
        <textarea
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button
          className="submit"
          onClick={() => sendMessage(currentConversation, messageText)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const CreateConversation = ({ createConversation, users }) => {
  const [messageObject, setMessageObject] = React.useState("");
  const [recipient, setRecipient] = React.useState(users[0]);
  return (
    <div>
      <h3>Send a message</h3>
      <p> Select a recipient for your message</p>

      <input
        onChange={(event) => setMessageObject(event.target.value)}
        value={messageObject}
        placeholder="Message Object"
      />
      <select onChange={(event) => setRecipient(event.target.value)}>
        {users.map((user) => (
          <option value={user}>{user}</option>
        ))}
      </select>
      <p>
        Message Object: {messageObject}, recipient: {recipient}
      </p>
      <button
        onClick={() => createConversation(recipient, messageObject)}
        disabled={!recipient}
      >
        Send
      </button>
    </div>
  );
};

export default withFirebase(ConversationPage);
*/
// Source for this file:
// https://medium.com/javascript-in-plain-english/creating-an-instant-messenger-with-react-custom-hooks-firebase-355bd544192