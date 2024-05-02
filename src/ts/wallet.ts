import Web3Modal from "web3modal";
import * as $ from "jquery";

let web3Modal: Web3Modal;
let provider: any;

let isKeyDisabled: boolean = true;

function handleKeyEvent(event: KeyboardEvent): boolean | void {
  if (isKeyDisabled) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}

web3Modal = new Web3Modal({
  cacheProvider: false,
  disableInjectedProvider: false,
});

document.body.addEventListener("keydown", handleKeyEvent);
document.body.addEventListener("keyup", handleKeyEvent);
export class Wallet {
  constructor() {
    this.generateHTML();
    $(".wallet-page").hide();
    $(".price-page").hide();
    $(".state-page").hide();
    $(".buy-stash").hide();
    $(".race").hide();
    $(".ready").hide();
    $(".go").hide();
    $(".screen").hide();
  }

  private generateHTML(): void {
    $(`<div class="wallet-page">
        <div class="wallet-content">
            <div class="wallet-text">
                <p>Prize Pool $125</p>
                <p>Race Entry $1</p>
                <p>Buy Stash to Race</p>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 85px;">
                <button id="btn-wallet">Connect Wallet</button>
            </div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="price-page">
        <div class="price-pool">
            <div style="width: 122px;">PRIZE POOL $278
            </div>
            <div style="width: 219px; margin-top:5px;">DAILY TOURNAMENT EDNS 4:33:01</div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="state-page">
        <div class="state-content">
            <div style="border: 2px solid #30C823;">Player Wallet ID</div>
            <div style="border: 2px solid #C8A423;">STASH 1666</div>
            <div style="border: 2px solid #C8A423;">RACE POINTS 0</div>
            <div style="border: 2px solid #C8A423;">RANk 0</div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="buy-stash">
        <div class="stash-page">
            <p style="font-size: 30px;">Race Entry Fee $</p>
            <div style="font-size: 23px; display: flex; align-items: center;">
                <p>Enter Number of Tickets</p>
                <div style="margin-left: 30px;" class="ticket-number">
                    <input type="text" name="ticket-number" value="0" size="1">
                </div>
            </div>
            <div style="padding-left: 266px; padding-top: 16px;">
                <button id="btn-stash">BUY STASH</button>
            </div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="race">
        <div class="race-page">
            <p style="font-size: 30px;">Get Ready to Race!</p>
            <div style="padding-top: 16px;">
                <button id="btn-race" style="font-family: revert;">RACE!</button>
            </div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="ready">
        <div class="ready-page">
            <div style="padding-top: 16px;">
                <button id="btn-ready" style="font-family: revert; border: 3px solid #7ADE2B;">Ready</button>
            </div>
            <div style="margin-top: 45px;">
                <table>
                    <thead>
                        <tr>
                            <th>Player1</th>
                            <th>Player2</th>
                            <th>Player3</th>
                            <th>Player4</th>
                            <th>Player5</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>READY</td>
                            <td>READY</td>
                            <td>DISCONNECT IN <br>5,4,3,2,1</td>
                            <td>READY</td>
                            <td>READY</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `).appendTo("body");

    $(`<div class="go">
        <div style="display: flex; justify-content: center; align-items: center;">
            <div class="go-content">
                <div id="countNum">
                    <p>3.. 2.. 1.. GO!</p>
                </div>
            </div>

        </div>
    </div>
    `).appendTo("body");

    $(`<div class="screen">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="screen-content">
          <div id="screen-race">
            <div>02:00:00</div>
            <div>Race Length</div>
          </div>
          <div id="screen-elaspsed">
            <div>00:00:00</div>
            <div>Elaspsed Length</div>          
          </div>
         </div>
        </div>
      </div>
  `).appendTo("body");

    $("#btn-wallet").click(async () => {
      await this.onConnect();

      $(".wallet-page").hide();
      $(".buy-stash").show();
      $(".state-page").show();
    });

    $("#btn-race").click(async () => {
      $(".race").hide();
      $(".ready").show();
    });

    $("#btn-ready").click(async () => {
      $(".ready").hide();
      $(".go").show();
      $(".screen").show();
      const countNum: HTMLElement | null = document.getElementById("countNum");
      let cnt: number = 3;
      const interval = setInterval(() => {
        countNum.innerHTML = `<p>${cnt ? cnt : "Go!"}</p>`;
        cnt--;
        if (cnt < 0) {
          clearInterval(interval);
          setTimeout(() => {
            document.querySelector<HTMLElement>(".go").style.display = "none";
          }, 1000);
        }
      }, 1000);
    });

    $("#btn-stash").click(async () => {
      $(".buy-stash").hide();
      $(".race").show();
    });

  }

  public async onConnect(): Promise<void> {
    try {
      provider = await web3Modal.connect();
      isKeyDisabled = false;
    } catch (err) {
      console.log("Could not get a wallet connection", err);
    }
  }

  public async onDisconnect() {
    if (provider.close) {
      await provider.close();
      await web3Modal.clearCachedProvider();
      provider = null;
    }
  }
}
