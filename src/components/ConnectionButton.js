function ConnectionButton ({ connect }) {
    return (
        <p className="card-text">
            <button className="button button-primary" onClick={connect}>
                Connect your waller
            </button>
        </p>
    );
}

export default ConnectionButton;
