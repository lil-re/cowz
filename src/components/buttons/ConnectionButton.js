function ConnectionButton ({ connect }) {
    return (
        <p className="card-text">
            <button className="button button-orange" onClick={connect}>
                Connect with Metamask
            </button>
        </p>
    );
}

export default ConnectionButton;
