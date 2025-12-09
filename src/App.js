function Button({ children, onClick }) {
  return (
    <button className='btn' onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className='app'>
      <div className='side-bar'>
        <FriendsLlist />
        <FormAddFriend />
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsLlist() {
  return (
    <div className='friends-list'>
      <Friend />
      <Friend />
      <Friend />
    </div>
  );
}

function Friend() {
  return (
    <div className='friend'>
      <img
        className='friend-img'
        src='https://i.pravatar.cc/48?u=123'
        alt='sarrah'
      />
      <h3 className='friend-name'>Sarrah</h3>
      <p className='description red'>you owe sarah 2€</p>

      <Button>Select</Button>
    </div>
  );
}

function FormAddFriend() {
  return (
    <form className='form-add-friend'>
      <label htmlFor='user-name'>👫 Friend name</label>
      <input type='text' id='user-name' />

      <label htmlFor='image-url'>🌄 Image URL</label>
      <input type='text' id='image-url' value={"https://i.pravatar.cc/48"} />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with Sarah</h2>
      <label htmlFor='bill'>💰 Bill value</label>
      <input type='text' id='bill' />
      <label htmlFor='user-expense'>🧍‍♀️ Your expense</label>
      <input type='text' id='user-expense' />
      <label htmlFor='friend-expense'>👫 Sarah's expense</label>
      <input type='text' disabled value={12} />

      <label htmlFor='who'>🤑 Who is paying the bill</label>
      <select name='who' id='who'>
        <option value='user'>You</option>
        <option value='friend'>Sarah</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
