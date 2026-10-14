async function getPriceById(id, token) {
  
  if (!token) {
    return;
  }

  const payload = {
    token: token,
    method: "GET",
    url: `https://api.selfpublishingtitans.com/api/features/viewproduct/${id}`,
  };

  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    payload
  );
  return response;
}

async function updatePrice() {
  const token = await getToken();
  if (!token) {
    return;
  }
  const products = [
    {
      id: "6516aecf8a69c334783b3c27",
      domID: "pro-max-price",
      priceType: "monthly"
  
  }, // titans pro max
  {

    id: "655ee6781727b2465e13079c", // titans deep view
    domID: "deep-view-price",
    priceType: "lifetime"
  }
  ];

  for (let i = 0; i < products.length; i++) {
    let product = products[i]

    let priceData = await getPriceById(product.id, token);

    let priceDom = document.getElementById(product.domID)

    if(priceDom && priceData.data){
      priceData = priceData.data.data;
      if(product.priceType === "monthly") {
        priceDom.innerHTML = priceData.monthly_price;
      } else {
        priceDom.innerHTML = priceData.isSale ? priceData.sale_price : priceData.price;
      }
    }
    
  }
}

async function getPricingPage() {
  
  return `
   <div class="${stylePrefix}-modal-2" style="padding: 16px;" id="pricing-popup">

    <div class="${stylePrefix}-modal-content" style="width: max-content; max-width: min(800px, 96vw); max-height: 100%; margin: auto; display: flex; flex-grow: 1;">


      <div style="max-height: 100%;  display: flex; flex-direction: column; position: relative; gap: 16px;">
        <!-- header -->
        <div style="display: flex; justify-content: space-between; font-size: 16px;
        line-height: 28px;
        color: rgb(72, 94, 117);
        padding: 16px;
        display: flex;
        -webkit-box-align: start;
        align-items: start;
        gap: 8px;
        background-color: #E0D6FF;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        ">

          <h1>Want even more data for even more accurate niche research and analysis?</h1>
          <button style="border: none; outline: none; background: none; cursor: pointer;" id="close-pricing-popup">
            &#10006
          </button>
        </div>

        <div style="overflow-y: auto; position: relative; flex: 1 1 0%;">
          <!-- pricing table -->
          <table class="pricing-table">
            <thead>
              <tr>
                <th style="text-align: start; padding-bottom: 8px;" class="${stylePrefix}-title">Features</th>
                <th style="display: flex; justify-content: center; padding-bottom: 8px;" >Free</th>
                <th style="padding-bottom: 8px;">

                  <div style="display: flex; justify-content: center;">
                    Titans Pro Max
                  </div>
                  <div style="display: flex; justify-content: center;">
                    <span>$</span>
                    <span id="pro-max-price">24</span>
                    <span>/Month</span>
                  </div>
                  <div style="display: flex; justify-content: center; margin-top: 8px; margin-bottom: 8px;">
                    <a href="https://www.selfpublishingtitans.com/titans-pro" target="_blank" class="${stylePrefix}-mui-purple-btn" style="  text-decoration: none;">
                      Subscribe
                    </a>
                  </div>
                </th>
                <th style="padding-bottom: 8px;">
                  <div style="display: flex; justify-content: center;">
                    Titans Deep View
                  </div>
                  <div style="display: flex; justify-content: center;">
                    <span>$</span>
                    <span id="deep-view-price">149</span>
                    <span>/Lifetime</span>
                  </div>
                  <div style="display: flex; justify-content: center; margin-top: 8px; margin-bottom: 8px;">
                    <a href="https://www.selfpublishingtitans.com/shop/655ee6781727b2465e13079c" class="${stylePrefix}-mui-purple-btn" style=" text-decoration: none;">
                      Select
                    </a>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr class="${stylePrefix}-title">
                <th colspan="4"
                  style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
                  Titans Deep View Extension
                </th>
              </tr>
              <tr>
                <td style="text-align: start;">Quickly Analyze the Top 100 Competitors for All Niches with all key
                  metrics</td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

                    <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                      data-testid="CloseIcon">
                      <path
                        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                      </path>
                    </svg>
                  </div>
                </td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor"
                        d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                      </path>
                    </svg>
                  </div>
                </td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor"
                        d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                      </path>
                    </svg>
                  </div>
                </td>
              </tr>

              <tr class="${stylePrefix}-title">
                <th colspan="4"
                  style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
                  Full Access to Sales Estimates
                </th>
              </tr>

              <tr class="${stylePrefix}-subtitle">
                <td style="text-align: start;">Get 1 and 30 day sales estimates for every product</td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

                    <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                      data-testid="CloseIcon">
                      <path
                        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                      </path>
                    </svg>
                  </div>
                </td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor"
                        d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                      </path>
                    </svg>
                  </div>
                </td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor"
                        d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                      </path>
                    </svg>
                  </div>
                </td>
              </tr>
              <tr class="${stylePrefix}-title">
                <th colspan="4"
                  style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
                  Most Used Competitor Keywords
                </th>
              </tr>
              <tr class="${stylePrefix}-subtitle">
                <td style="text-align: start;">See a full word count of all competitors keywords from highest to lowest
                  of all keywords in titles</td>
                <td>
                  <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                    <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                      data-testid="CloseIcon">
                      <path
                        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                      </path>
                    </svg>
                  </div>
                </td>
                <td ">
                  <div style=" min-width: 160px; display: flex; justify-content: center; justify-items: center;">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                      d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                    </path>
                  </svg>
        </div>
        </td>
        <td>
          <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor"
                d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
              </path>
            </svg>
          </div>

        </td>
        </tr>
        <tr class="${stylePrefix}-title">
          <th colspan="4" style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
            Competitor Review Analysis
          </th>
        </tr>
        <tr class="${stylePrefix}-subtitle">
          <td style="text-align: start;">
            Instantly see how many top competitors have less than 50 and less than 5 reviews
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>
            </div>
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>
            </div>

          </td>
        </tr>
        <tr class="${stylePrefix}-title">
          <th colspan="4" style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
            Search Volume
          </th>
        </tr>
        <tr>

          <td style="text-align: start;">See the monthly search volume estumates for every search term right on the
            Amazon search results pages</td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>

          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>
            </div>

          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">


              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>

          </td>
        </tr>
        <tr class="${stylePrefix}-title">
          <th colspan="4" style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
            Coloring Book Maker Tool
          </th>
        </tr>
        <tr>
          <td style="text-align: start;">Create an unlimited amount of coloring books with this tool. It comes with over
            9,200 hand drawn illustrations.</td>
          <td>

            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">


              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>

          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>
            </div>
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>

            </div>
          </td>
        </tr>
        <tr class="${stylePrefix}-title">
          <th colspan="4" style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
            Puzzle & Activity Book Tools
          </th>
        </tr>
        <tr>
          <td style="text-align: start;">
            Create an unlimited amount of books and sell through Kindle Direct Publishing with the following tools:
            Sudoku, Word
            Search, Crossword, Letter Maze, Shape Maze, Nonogram, Word Snake, Number Search, Word Scramble, Pontoon
            Grid, Kakuro,
            Cryptogram, Link Janitor, Hidato, Wordoku, Drawgrid, Letter Tracing, Bingo Card, Equation Solver,
            Cryptomaths, Cross
            Sums
          </td>
          <td>

            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">


              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>

          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>
            </div>
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">
              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>

            </div>
          </td>
        </tr>
        <tr class="${stylePrefix}-title">
          <th colspan="4" style="background-color: rgb(243, 244, 246); border: 1px solid #e5e5e5; text-align: start;">
            Titans Pro
          </th>
        </tr>
        <tr>
          <td>Huge Search Suggestion Expander, Search Volume Ext., Search Results, Opportunity & Demand Analysis for
            every search</td>
          <td>

            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">


              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>

          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" class="${stylePrefix}-svg-inline"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M440.1 103C450.3 112.4 450.3 127.6 440.1 136.1L176.1 400.1C167.6 410.3 152.4 410.3 143 400.1L7.029 264.1C-2.343 255.6-2.343 240.4 7.029 231C16.4 221.7 31.6 221.7 40.97 231L160 350.1L407 103C416.4 93.66 431.6 93.66 440.1 103V103z">
                </path>
              </svg>

            </div>
          </td>
          <td>
            <div style="min-width: 160px; display: flex; justify-content: center; justify-items: center;">

              <svg class="${stylePrefix}-svg-inline" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </div>
          </td>
        </tr>
        </tbody>

        </table>
      </div>


      <footer>
        <div style="display: flex; justify-items: center; justify-content: center;">
          <div>
            <button class="${stylePrefix}-mui-purple-btn" id="close-pricing-popup" style="outline: none; border: none;">Cancel</button>
            <a class="${stylePrefix}-mui-purple-btn" href="https://www.selfpublishingtitans.com/titans-pro" style="text-decoration: none;" target="_blank">Pricing Page</a>
          </div>

        </div>

      </footer>
    </div>
  </div>


  </div>
    `;
}

// $(document).ready(async function () {
//   const pricingHtml = await getPricingPage();
//   // Add the pricing popup to the body
//   $("#a-page").append(pricingHtml);
//   updatePrice();
// });

$(document).on("click", ".price-popup", async () => {
    const pricingHtml = await getPricingPage();
    // Add the pricing popup to the body
    $("#a-page").append(pricingHtml);
    updatePrice();
}
)

$(document).on("click", "#close-pricing-popup", () => {
  document.getElementById("pricing-popup").remove();
})