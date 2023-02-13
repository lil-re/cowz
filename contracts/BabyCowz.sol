// SPDX-License-Identifier: GPL-3.0

// Created by HashLips
// The Nerdy Coder Clones

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BabyCowz is ERC721Enumerable, Ownable {
  using Strings for uint256;

  // struct to store a stake's token, owner, and earning values
  struct Stake {
    uint24 tokenId;
    uint48 timestamp;
    address owner;
  }

  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0 ether;
  uint256 public maxSupply = 2000;
  uint256 public maxMintAmount = 1;
  uint256 public maxPerWallet = 1;
  bool public paused = true;
  mapping(address => bool) public whitelisted;

  IERC721 public parentContract;
  uint256 public totalStaked;
  uint24 public notFoundIndex = 0;
  mapping(uint256 => Stake) public vault;

  event NFTStaked(address owner, uint256 tokenId, uint256 value);
  event NFTUnstaked(address owner, uint256 tokenId, uint256 value);
  event Claimed(address owner, uint256 amount);

  constructor() ERC721("BabyCowz", "bCOWZ") {
    // mint(msg.sender, 1);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function _reward(address _to, uint256 _mintAmount) internal {
    uint256 supply = totalSupply();
    require(_mintAmount > 0, 'Invalid mint amount');
    require(_mintAmount <= maxMintAmount, 'Exceed max amount');
    require(balanceOf(msg.sender) + 1 <= maxPerWallet, 'Exceed max per wallet');
    require(supply + _mintAmount <= maxSupply, 'Sold out');

    if (msg.sender != owner()) {
      if (whitelisted[msg.sender] != true) {
        require(msg.value >= cost * _mintAmount);
      }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused, 'Minting not enabled');
    require(_mintAmount > 0, 'Invalid mint amount');
    require(_mintAmount <= maxMintAmount, 'Exceed max amount');
    require(balanceOf(msg.sender) + 1 <= maxPerWallet, 'Exceed max per wallet');
    require(supply + _mintAmount <= maxSupply, 'Sold out');

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost * _mintAmount);
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  function walletOfOwner(address _owner) public view returns (uint256[] memory) {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  // ---------- ONLY OWNER ----------

  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
    maxMintAmount = _newMaxMintAmount;
  }

  function setMaxPerWallet(uint256 _newMaxPerWallet) public onlyOwner {
    maxPerWallet = _newMaxPerWallet;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }

  // ---------- STAKES ----------
  function setParentAddress(address _parentAddress) external onlyOwner {
    parentContract = IERC721(_parentAddress);
  }

  function stake(uint256 _tokenId) external {
    require(parentContract.ownerOf(_tokenId) == msg.sender, "Not your token");
    require(vault[_tokenId].tokenId == 0, 'Already staked');

    parentContract.transferFrom(msg.sender, address(this), _tokenId);
    emit NFTStaked(msg.sender, _tokenId, block.timestamp);

    vault[_tokenId] = Stake({
      owner: msg.sender,
      tokenId: uint24(_tokenId),
      timestamp: uint48(block.timestamp)
    });
    totalStaked++;
  }

  function _unstake(address account, uint256 tokenId) internal {
    Stake memory staked = vault[tokenId];
    require(staked.owner == msg.sender, "Not an owner");

    delete vault[tokenId];
    emit NFTUnstaked(account, tokenId, block.timestamp);
    parentContract.transferFrom(address(this), account, tokenId);
    totalStaked--;
  }

  function claim(uint256 _tokenId) external {
      _claim(msg.sender, _tokenId, false);
  }

  function claimForAddress(address account, uint256 _tokenId) external {
      _claim(account, _tokenId, false);
  }

  function unstake(uint256 _tokenId) external {
      _claim(msg.sender, _tokenId, true);
  }

  function _claim(address _account, uint256 _tokenId, bool _status) internal {
    Stake memory staked = vault[_tokenId];
    require(staked.owner == _account, "not an owner");
    
    uint256 earned = _calculateRewards(staked);
    vault[_tokenId] = Stake({
      owner: _account,
      tokenId: uint24(_tokenId),
      timestamp: uint48(block.timestamp)
    });

    if (earned > 0) {
      earned = earned / 10;
      _reward(_account, earned);
    }
    if (_status) {
      _unstake(_account, _tokenId);
    }
    emit Claimed(_account, earned);
  }

  function ownersCow(address _account) external view returns (uint24) {
    for (uint248 i = 1; i <= 200; i++) {
      Stake memory staked = vault[i];

      if (staked.owner == _account) {
        return staked.tokenId;
      }
    }
    return notFoundIndex;
  }

  function earningInfo(uint256 _tokenId) external view returns (uint256 info) {
    Stake memory staked = vault[_tokenId];
    return _calculateRewards(staked);
  }

  function _calculateRewards(Stake memory _stake) public view returns (uint256){
    return (block.timestamp - _stake.timestamp) / (86400 * 30);
  }
}
