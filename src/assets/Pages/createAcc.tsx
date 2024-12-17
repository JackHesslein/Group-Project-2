
export default function CreateAccount() {

return (
<div>
    <h1 className="formTitle">Create an Account</h1>
    <form className="form">
        <div>
            <label className="name">Name:</label>
            <input className="input" type="text" placeholder="Name" />
        </div>
        <div>
            <button className="submit" type="submit">Login</button>
        </div>
    </form>
</div>
);
}