import { useState } from "react";

function Button({ className, children, onClick }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

const initialFriends = [
  {
    id: 1234,
    name: "Alice",
    Image: "https://i.pravatar.cc/48",
    balance: -10,
  },
  {
    id: 1235,
    name: "Bob",
    image: "https://i.pravatar.cc/48",
    balance: 20,
  },
  {
    id: 1236,
    name: "Ali",
    image: "https://i.pravatar.cc/48",
    balance: -3,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  function handleSelection(selFriend) {
    setSelectedFriend((friend) =>
      friend?.id === selFriend.id ? null : selFriend
    );
  }

  function handleSplitBill(bill) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + bill }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className='app'>
      <div className='side-bar'>
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        <FormAddFriend onAddFriend={handleAddFriend} />
      </div>

      {selectedFriend && (
        <FormSplitBill
          handleSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ selectedFriend, friends, onSelection }) {
  return (
    <div className='friends-list'>
      {friends.map((friend) => {
        return (
          <Friend
            onSelection={onSelection}
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  return (
    <div className='friend'>
      <img
        className='friend-img'
        src={`${friend.image}?u=${friend.id}`}
        alt={friend.name}
      />
      <h3 className='friend-name'>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className='description green'>
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance < 0 && (
        <p className='description red'>
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      <Button onClick={() => onSelection(friend)}>
        {friend.id === selectedFriend?.id ? "Close" : "Select"}
      </Button>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      id,
      image: `${image}?u=${id}`,
      balance: 0,
      isSelected: false,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <>
      {isAddFriendOpen && (
        <form className='form-add-friend' onSubmit={handleSubmit}>
          <label htmlFor='user-name'>👫 Friend name</label>
          <input
            type='text'
            id='user-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='image-url'>🌄 Image URL</label>
          <input
            type='text'
            id='image-url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button>Add</Button>
        </form>
      )}

      <Button
        className='add-friend-btn'
        onClick={() => setIsAddFriendOpen((cur) => !cur)}
      >
        {!isAddFriendOpen ? "Add Friend" : "Close"}
      </Button>
    </>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [userBill, setUserBill] = useState("");
  const friendBill = bill && userBill ? bill - userBill : "";
  const [whoPays, setWhoPays] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill && !userBill) return;

    let value;

    if (whoPays === "user") value = friendBill;
    if (whoPays === "friend") value = -userBill;

    handleSplitBill(value);
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor='bill'>💰 Bill value</label>
      <input
        type='text'
        id='bill'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor='user-expense'>🧍‍♀️ Your expense</label>
      <input
        type='text'
        id='user-expense'
        value={userBill}
        onChange={(e) => setUserBill(Number(e.target.value))}
      />
      <label htmlFor='friend-expense'>👫 {selectedFriend.name}'s expense</label>
      <input type='text' disabled value={friendBill} />

      <label htmlFor='who'>🤑 Who is paying the bill</label>
      <select
        name='who'
        id='who'
        value={whoPays}
        onChange={(e) => setWhoPays(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
