function StakeButton ({ data, stake }) {
    return (
        <div>
            <p className="card-text cost">
                You already have a Cow
            </p>
            <p className="card-text cost">
                Stake it to get BabyCowz !
            </p>
            <p className="card-text">
                <button className="button button-green" onClick={stake}>
                    Stake your Cow
                </button>
            </p>
        </div>
      );
}

export default StakeButton;
