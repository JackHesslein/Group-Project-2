
export default function Login() {

    return (
<div>
    <h1 className="formTitle">Login</h1>
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