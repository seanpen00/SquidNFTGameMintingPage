import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/mintkeeper.jpg";
import silver from "./assets/images/guard.PNG";
import gold from "./assets/images/question.PNG";
import diamond from "./assets/images/player.PNG";
import newbanner from "./assets/images/squidbanner.gif"

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: solid;
  background-color: black;
  padding: 10px;
  fontFamily: Staatliches, cursive;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
  font-size: 40px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    color: #white;
  }
  :hover {
    transition-duration: .4s;
    color: #02F702;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 300px;
  height: 44px;
  @media (min-width: 767px) {
    width: 600px;
    height: 80px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);
  const claimNFTs = (_amount) => {
    _amount = document.getElementById("inputBox").value;
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Official OJINGEO...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      // ********
      // You can change the line above to
      // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
      // users to be able to mint through your website!
      // And after you're done with whitelisted users buying from your website,
      // You can switch it back to .mint(blockchain.account, _amount).
      // ********
      .send({
        gasLimit: 285000 * _amount,
        to: "0xf65EbF7AcD21fDa6e350EE11CF19da2e257BC01e",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.045 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "CONGRATS! Your OJINGEO successfully minted! Good luck, you're officially in the game. "
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)", fontSize: 40 }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24, backgroundColor: "black"}}>
        <s.TextTitle
          style={{ 
          display: "flex", 
          flexDirection: "row", 
          textAlign: "left", 
          fontSize: 40, 
          fontWeight: "bold", 
          paddingRight: 10, 
          margin: 0, 
          
          borderStyle: "solid", 
          borderColor: "white", 
          borderWidth: 0,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 30,
          
          borderRadius: 20, 
          textAlign: "center", 
          justifySelf: "center", 
          justifyContent: "center", 
          color:"#7C3AED", 
          background: "black",
          }}
        >
          {/* Squid Game */}
          <a href="https://google.com"><StyledImg alt={"Squid Game Logo"} 
          src={newbanner} 
          style={{textAlign: "center"}}></StyledImg></a>
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24, paddingTop: 0 }}>
          <s.Container flex={1} jc={"center"} ai={"center"} style={{paddingTop: 0, flexDirection: "column"}}>
          <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "center", 
              maxWidth: 600,
              fontSize: 25, 
              fontWeight: "bold", 
              borderStyle: "solid", 
              borderColor: "black",}}>
                 Squidverse is a collection of 10,000 Unique <bold style={{color: "#ED1B76"}}>guards</bold> / <bold style={{color: "#249F9C"}}> players </bold> who live on the Ethereum Blockchain. Risk Your
                 lives and come play for the grand prize weekly. <br/>Who will be victorious....<br/>
                 <text style={{fontSize: 40}}>the <bold style={{color: "#ED1B76"}}>guards</bold> or the
                 <bold style={{color: "#249F9C"}}> players</bold>?</text> 
              </s.TextTitle>
            {/* <a href="https://skulljunkiesnft.com/"><StyledImg alt={"Mintkeeper"} src={i1} style={{paddingTop: 0, borderStyle: "solid", borderColor: "black", borderWidth: 0,
                    borderRadius: 0 }}/></a> */}
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 40, fontWeight: "bold", borderStyle: "solid", borderColor: "white", 
              borderWidth: 5,
              paddingLeft: 100,
              paddingRight: 100,
              borderRadius: 10,
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 5,
              marginBottom: 20,
              background: "black",
              color: "white",
              }}
            > Counter:<br/>
              {blockchain.account == null ? "   ?????" : ("   " + data.totalSupply)}/10000
            </s.TextTitle>
            <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ 
              backgroundColor: "black", 
              padding: 24,
              paddingTop: 20,
              borderStyle: "solid", 
              borderColor: "white", 
              borderWidth: 0,
              borderRadius: 20,
              fontSize: 40,
              maxWidth: 700,
              maxHeight: 1500 }}
          >
            {Number(data.totalSupply) == 10000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                {/* <s.SpacerSmall /> */}
                <s.TextDescription style={{ textAlign: "center" }}>
                  Dont worry, you're not missing out! You can still get OJINGEO on{" "}
                  <a
                    // target={"_blank"}
                    href={"https://testnets.opensea.io/collection/rinkeby-doodlenauts"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                {/* <s.TextTitle style={{ textAlign: "center", fontSize: 30 }}>
                  1 DOODL costs .01 ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center", fontSize: 30 }}>
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall /> */}
                <s.TextDescription style={{ textAlign: "center", fontSize: 40, color: "white" }}>
                  {feedback}
                </s.TextDescription>
                {/* <s.SpacerMedium /> */}
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ 
                      textAlign: "center", 
                      fontSize: 25, 
                      marginBottom: 0,
                      color: "white",
                      maxWidth: 600 }}>
                    Each <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold> 
                    is a cute generative piece of artwork with a mix of ~x 
                    different traits. Your <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> players</bold> will be staked and used to play various
                    squid games for weekly prize giveaways. the first game is about to be revealed,
                    will you play the squid game?
                    <s.SpacerSmall/>
                    <s.SpacerSmall/>
                      <div style={{flex: "display"}}>
                        <StyledImg alt={"silver"} src={silver} 
                        style={{
                          paddingTop: 0, 
                          borderStyle: "solid", 
                          borderColor: "black", 
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"silver"} src={silver} 
                        style={{
                          paddingTop: 0, 
                          borderStyle: "solid", 
                          borderColor: "black", 
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"gold"} src={gold} 
                        style={{
                          paddingTop: 0, 
                          borderStyle: "solid", 
                          borderColor: "black", 
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"diamond"} src={diamond} 
                        style={{
                          paddingTop: 0, 
                          borderStyle: "solid", 
                          borderColor: "black", 
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"diamond"} src={diamond} 
                        style={{
                          paddingTop: 0, 
                          borderStyle: "solid", 
                          borderColor: "black", 
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>

                    </div>
                    {/* <div style={{display: "flex", flexDirection: "column",
                        borderStyle: "solid", 
                          borderColor: "#D5B300", 
                          borderWidth: 5,
                          borderRadius: 10,
                          backgroundColor: "black" }}>
                      <bold style={{color: "#C0C0C0"}}>Silver:  5 / 10,000</bold> <br/>
                      <bold style={{color: "#D5B300"}}>Gold:  3 / 10,000</bold> <br/>
                      <bold style={{color: "#B9F2FF"}}>Diamond:  1 / 10,000</bold></div> */}
                    </s.TextDescription>
                    {/* <s.SpacerSmall /> */}
                    {/* <s.TextDescription style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>
                      Connect to the Skulljunkies Minter!
                    </s.TextDescription> */}
                    {/* <s.SpacerSmall /> */}
                    <StyledButton
                      style={{
                        fontFamily:"'Staatliches', cursive;",
                        // background: "black",
                        // color: "white",
                        // borderStyle: "solid", 
                        // borderColor: "#7C3AED", 
                        borderWidth: 10,
                        borderRadius: 90,
                        fontSize: 60,
                        marginTop: 30

                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    <s.SpacerLarge />
                    {/* <s.TextDescription style={{textAlign: "center", fontSize: 30, marginBottom: 0, paddingBottom: 0}}>
                      <a href="https://google.com">Boo Crew NFT Smart Contract</a>
                    </s.TextDescription> */}
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center", fontSize: 50}}>
                          <bold style={{color: "white"}}>{blockchain.errorMsg}</bold>
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"} style={{
                    marginTop: 0, 
                    paddingTop: 0,
                    color: "white"}}>
                    <form>
                    {/* I want  */}
                    <input 
                    id="inputBox"
                    placeholder="#" 
                    type="number" 
                    min="1" 
                    max="15"
                    style={{
                      fontFamily: "'Staatliches', cursive",
                      fontSize: 30,
                      textAlign: "center",
                      backgroundColor: "black",
                      color: "white",
                      borderWidth: 4,
                      borderColor: "white",
                      borderStyle: "solid",
                      borderRadius: 100,
                      paddingRight: 10,
                      // marginBottom: 20,
                      // paddingLeft: 0,
                      // marginLeft: 0,
                      width: 100,
                      }}
                    /> 
                    {/* Skulljunkies! */}
                    </form>
                    <s.SpacerSmall/>
                    <StyledButton
                     style={{fontFamily: "'Staatliches', cursive;", fontSize: 50}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "MINT"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
          <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>ROAD</bold> <bold style={{color: "#249F9C"}}>MAP </bold> 
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                   <text style={{fontSize: 50, color: "#249F9C"}}>25%</text> - You are in debt, how will you pay your bills?
                   A mysterious man hands you a card with a phone number. Will you call it?
                   <text style={{fontSize: 35, color: "#249F9C"}}> 10 lucky holders will receive a player airdrop.</text>
                   <br/><br/>
                   <text style={{fontSize: 50, color: "#ED1B76"}}>50%</text> - The guards have been preparing for your arrival. You have no idea
                   what they have in store for you. 
                   <text style={{fontSize: 35, color: "#ED1B76"}}> 10 lucky holders recieve a guard airdrop.</text>
                   <br/><br/>
                   <text style={{fontSize: 50, color: "#02FF02"}}>100%</text> - The squid game begins! Which side are you on? The first
                   game will be revealed. Pick your side and stake either your player or guard.
                   <text style={{fontSize: 35, color: "#02FF02"}}>The winning team takes home the grand prize of 5% of the royalty revenue
                   split amongst 5 players/guards randomly.</text>
                 </text>
              </s.TextTitle>
              <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              marginTop: 50,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>ROAD</bold> <bold style={{color: "#249F9C"}}>MAP </bold> <bold style={{color: "#ED1B76", fontSize: 40}}>Cont.</bold>
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                 <text style={{fontSize: 35, color: "#02FF02"}}>Rarity Tools</text> - We will list the guards/players on rarity tools.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Community Funds</text> - We will deposit 5% of weekly royalty 
                   revenue into a community wallet to be disbursed to the winners of the games.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Additional Games</text> - After the first game has concluded,
                   will you continue playing and risking your life? There will be a total of 6 games. Pay your debts.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Raffles/Airdrops</text> - Have a chance of getting free airdrops and participate in our raffles. You owe so much money.
                 </text>
              </s.TextTitle>
              <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              marginTop: 50,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>F</bold>.<bold style={{color: "#249F9C"}}>A</bold>.<bold style={{color: "#ED1B76"}}>Q</bold>.
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                   We won't tell you all of the rules. That'll ruin the fun. But here are some directions
                   to get you to the squid games.
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How can I get a <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How can I purchase a <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How many <bold style={{color: "#ED1B76"}}>guards</bold> /<bold style={{color: "#249F9C"}}> players </bold> can I purchase?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     When will my <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold> be revealed?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How do I know if I will get a <bold style={{color: "#ED1B76"}}>guard</bold> or a <bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   
                   
                 </text>
              </s.TextTitle>
          </s.Container>
          {/* <s.SpacerMedium /> */}
          
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 40}}>
                      <a 
                      href="https://rinkeby.etherscan.io/address/0xf65EbF7AcD21fDa6e350EE11CF19da2e257BC01e"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: 20,
                      }}
                      >SquidverseNFT Smart Contract</a>
          </s.TextDescription>
          <s.SpacerSmall />
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 10, color: "white" }}>
            asdf
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
