import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Col,
  Form,
  Row
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "../../App.css";
import BlogImg from "../../asstes/BlogImage.jpg";
import BackButton from "../../components/tips/BackButton";
import { AppContext } from "../../Context";

function Blog() {
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);

  useEffect(()=>{
    document.getElementById("root").scrollTop=0;
    sessionStorage.setItem("previousPathName", window.location.pathname);
  },[null],Navigate)
  return (
    <div className=" mainbg mobile-margin">
      <Row className="centeritem h90vh" id="head">
        <Col md={7} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
              <p>
                <h1 className="text-center mb-3">
                  <strong>Blog</strong>
                </h1>
                <br />
                <Accordion defaultActiveKey="">
                  <Accordion.Item eventKey="0" className="mb-2 flex-1 w-100">
                    <Accordion.Header>
                      <h5>
                        8 Things You Need To Know Before Heading To The Money
                        Changer
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <h3>
                          8 Things You Need To Know Before Heading To The Money
                          Changer
                        </h3>

                        <h6>Shashi Kumar</h6>
                        <br />

                        <img src={BlogImg} />
                        <br />

                        <p className="mt-2">
                          After a two-year hiatus, Singaporeans can start
                          travelling again, be it a short-day trip to Johor or a
                          long Europe trip. Wherever the place may be, having
                          some foreign currency is always part of everyone’s
                          must-have list of items.
                        </p>

                        <p>
                          In case you have forgotten or are new to exchanging
                          money from a money changer, here is a quick crash
                          course on what you need to know.
                        </p>

                        <h4>
                          #1 Actual Exchange Rates You Receive May Differ With
                          Rates Published On Internet
                        </h4>
                        <p>
                          If you are exchanging at a money changer for the first
                          time, you may be surprised by the difference between
                          the rates offered by the money changer and the rates
                          that you may see online. Usually, the rates offered by
                          the money changers are slightly lower than the online
                          rates.
                        </p>
                        <p>
                          For example, let’s assume you wish to change some
                          Singapore Dollars for Malaysian Ringgit to spend over
                          the weekend in Johor. You check the rates online and
                          you see a popular online currency platform offering an
                          exchange rate of 1 Singapore Dollar for 3.18 Malaysian
                          Ringgit. However, when you head down to any money
                          changer on the same day, you may find that the rates
                          they offer range between 3.15 and 3.165. This
                          difference is called a spread, and that is how money
                          changers make money.
                        </p>
                        <p>
                          This spread accounts for not only the live interbank
                          rates but also the local demand and supply of each
                          currency.
                        </p>

                        <h4>#2 Don’t Change Your Money At Airports</h4>
                        <p>
                          Exchanging your currency at airports might be
                          convenient, but it does come with a price. Typically,
                          the exchange rates are less favourable than the rates
                          offered by neighbourhood money changers.
                        </p>
                        <p>
                          Factors like high rental costs at airports and greater
                          demand for physical cash by travellers are some of the
                          reasons why the exchange rates are lower at airports.
                        </p>
                        <p>
                          So, if you want to have the best exchange rates, avoid
                          the money changer kiosks atairports and instead go for
                          the money changers at the city centre.
                        </p>

                        <h4>
                          #3 Finding The Money Changers With The Best Rates
                        </h4>
                        <p>
                          It can be frustrating to find out that you have
                          received a lousier exchange rate than the rest of your
                          travelling companions. Knowing the best place to
                          change your foreign currency can save you money,
                          especially when you are exchanging a relatively large
                          amount.
                        </p>
                        <p>
                          To save you some time, we will point you to the top 3
                          popular locations where the rates are relatively fair
                          in Singapore:
                        </p>
                        <p>– The Arcade at Raffles Place</p>
                        <p>– Mustafa</p>
                        <p>– People’s Park Complex </p>
                        <p>
                          You can also use CashChanger to find money changers
                          offering the best exchange rates, or you can use it to
                          find a money changer that is closest to you.
                        </p>

                        <h4>
                          #4 Avoid Going Down To A Money Changer On Weekends
                        </h4>
                        <p>
                          If possible, you should avoid exchanging your currency
                          over the weekends. The reason being, the forex markets
                          are closed. As such, there are no live interbank rates
                          published for money changers to take reference from.
                        </p>
                        <p>
                          Hence, money changers would usually price the rates
                          lower over the weekend to account for any currency
                          fluctuations based on last Friday’s closing.
                        </p>

                        <h4>
                          #5 Buy or Sell? Which Column Should You Look At?
                        </h4>
                        <p>
                          If you are new to exchanging money, you could be
                          confused by which (buy or sell) column of the board
                          you should focus on.
                        </p>
                        <p>
                          Here is how you can understand it once and for all.
                          Ask yourself if you are buying a foreign currency
                          using the Singapore Dollar or if you are selling the
                          foreign currency you have for the Singapore Dollar.
                        </p>
                        <p>
                          Assuming you are travelling to the US, below is what
                          you will see at the exchange board.
                        </p>
                        <p>We Buy We Sell USD 0.729 0.720</p>
                        <p>
                          So if you wish to change your SGD currency to USD
                          currency, it means you are “buying” the USD with SGD.
                          This makes you the buyer, and the money changer, the
                          seller.
                        </p>
                        <p>
                          Hence, the money changer is selling you the USD
                          currency. You should look at the column “We Sell”.
                        </p>
                        <p>
                          A quick way to check if you are looking at the correct
                          rate will be to convert the SGD in using both rates.
                          Whichever rate results in you having less of the
                          foreign currency would be the correct one.
                        </p>

                        <h4>
                          #6 Personal Information Is Required For Transactions
                          Above $5,000
                        </h4>
                        <p>
                          If you are exchanging more than SGD $5,000, you will
                          need to provide your personal information to the money
                          changer as part of the directive found in MAS Notice
                          3001.
                        </p>
                        <p>
                          You may be asked to provide your identify card or
                          document for verification, including proof of address.
                          All of your information will be kept private and
                          confidential by the money changers as per the Personal
                          Data Protection Act.
                        </p>

                        <h4>#7 Ask For Receipt</h4>
                        <p>
                          Once you have changed your money, do not forget to ask
                          for a proper receipt for the transaction. All receipts
                          must contain the details of the money changer and the
                          transaction as per the directive from MAS Notice 3004.
                        </p>
                        <p>
                          If you are given a calculator printout as it was in
                          the past, you should not accept it. Instead, you
                          should insist on the official receipt. This will be
                          helpful in the event of any disputes between the money
                          changer and yourself.
                        </p>

                        <h4>
                          #8 Go Cashless With The Use Of Multi-Currency Accounts
                          And Wallets
                        </h4>
                        <p>
                          {" "}
                          Physical cash is slowly trending out as governments
                          push for a cashless society. While there may be some
                          occasions where physical cash could be required, in
                          general, you can get by with cashless payments in most
                          parts of the world.
                        </p>
                        <p>
                          You can start making cashless payments with the use of
                          multi-currency accounts and wallets. A multicurrency
                          account is typically an account at a bank or financial
                          firm that lets you spend, receive, and hold multiple
                          currencies. Some of the major plus points include:
                          one, you are able to get the exchange rates close to
                          the online rates; two, you can exchange and hold some
                          of these currencies in your wallet whenever the rates
                          are favourable; and three, you do not have to pay the
                          high finance charges and receive low exchange rates
                          that are typically associated with traditional credit
                          cards.
                        </p>
                        <p>
                          <em>
                            Source:{" "}
                            <a href="https://finance.yahoo.com/news/3-things-know-heading-money-233044888.html">
                              https://finance.yahoo.com/news/3-things-know-heading-money-233044888.html
                            </a>
                          </em>
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1" className="mb-2 flex-1">
                    <Accordion.Header>
                      <h5>8 Ways to Save When Exchanging Foreign Currency</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h3>8 Ways to Save When Exchanging Foreign Currency</h3>
                      <p>
                        We've all been there… it's 4 hours prior to boarding the
                        plane, and you realise you haven't exchanged any foreign
                        currency. Fear not: Skyscanner New Zealand has plenty of
                        tips for exchanging foreign currency and using money
                        abroad! Here we share our advice on changing money prior
                        to travelling, avoiding ATM fees, and how to get the
                        most when you do decide to exchange (we also bust myths
                        about traveller's cheques and using your credit card
                        overseas!).
                      </p>

                      <p>1. Avoid exchanging at the airport</p>
                      <p>
                        It’s best to check the currency exchange rate as soon as
                        you know you’re travelling. By tracking the changes,
                        you’ll get a good indication of the best time to
                        changing your money.
                      </p>
                      <p>
                        {" "}
                        It is always recommended to exchange currency in
                        advance. Exchanging your currency at the airport usually
                        means you’re faced with poor exchange rates. If you
                        don’t have the time to physically visit your local money
                        changer, consider using a service like Travelex, which
                        allows you to buy online and pick your money order up at
                        the airport.
                      </p>

                      <p>
                        2. Make ‘last minute’ withdrawals from your bank at home
                      </p>
                      <p>
                        If you haven’t had a chance to order your cash online,
                        don’t rule out your bank. Although they have earned a
                        bad rep in the past for offering terrible rates, in
                        recent years some have been found to offer reasonably
                        competitive exchange rates so it’s worth popping into a
                        local branch before you go.
                      </p>

                      <p>
                        3. Avoid withdrawing currency abroad (or check if your
                        bank has in-country partners)
                      </p>
                      <p>
                        It is common practice for banks to charge an ATM fee of
                        between $5 and $10, but there are ways to avoid it. ATMs
                        participating in the Global ATM Alliance will allow you
                        to withdraw cash for free and some New Zealand banks,
                        such as Westpac and ANZ have partners in other countries
                        whereby if you use one of their partner ATMs, your fee
                        will get waived.
                      </p>

                      <p>
                        4. Pick the best bank and credit card provider for
                        travel
                      </p>
                      <p>
                        As mentioned early, ANZ and Westpac are both members of
                        the Global ATM Alliance so you so you won’t pay fees on
                        those ATMs.
                      </p>
                      <p>
                        Air New Zealand and Travelex also give you the option of
                        using a ‘travel card’. This is a card you can load up
                        with up to ten difference foreign currencies. Travelex
                        do have an initial load fee of 1% – so if you load $200,
                        the fee will be $2. They also charge $4 for monthly
                        inactivity (if you do not load the card within 12
                        months), and charge $10 for account closure. However,
                        it’s free to withdraw cash and make purchases.
                      </p>
                      <p>
                        When it comes to using your credit card, you’ll notice
                        there is a foreign transaction fee on all purchases –
                        usually between 1.5% and 3%. Whilst it’s not bad for a
                        one-off, and the rate on credit card money exchange is
                        usually very competitive, it will really sting if you
                        use it continuously. You can avoid this by buying in the
                        currency of your credit card (ie. NZD, instead of Euros,
                        Yen, Dollars, etc).
                      </p>
                      <p>
                        {" "}
                        If you’re taking your card abroad too, make sure you let
                        your bank know you’re travelling so they don’t block
                        your card for security reasons.
                      </p>

                      <p>5. Change currency at home</p>
                      <p>
                        If you change money at home, you have the benefit of
                        being able to plan ahead. Unfortunately, you don’t have
                        such luxuries on the ground and risk getting ripped off.
                        Local money changers buy currency at a very cheap rates,
                        and sell at an extremely expensive one. If you use the
                        XE app we mentioned earlier, you can use this as a guide
                        to negotiating a better rate with them. Don’t be shy,
                        it’s not uncommon to barter for a fairer exchange rate.
                        However, if your bank has ATMs or partner banks abroad,
                        you may be able to get a good deal, with minimal fees
                        and a reasonable exchange rate.
                      </p>

                      <p>
                        6. Be smart about using credit cards while travelling
                      </p>
                      <p>
                        {" "}
                        If you withdraw money out of an ATM using your credit
                        card (what the banks call a ‘cash advance’, you’ll
                        automatically be stung with a high interest rates on
                        that withdrawal (it can be as high as 24%). This
                        interest rate will continue to be charged to your card
                        until you pay off the entirety of the transaction.
                      </p>
                      <p>
                        On the flip-side, if you purchase items using a credit
                        card, for example, a fancy leather bag from Milan, you
                        needn’t worry about settling your balance until your
                        interest-free days are up.
                      </p>

                      <p>
                        7. Travellers cheques are still available, but uncommon
                      </p>
                      <p>
                        For those used to cheques, traveller’s cheques are
                        cheques amounting to the value of a specific amount, as
                        specified by the issuer, which can then be cashed at
                        financial institutions around the world. They’re rarely
                        accepted nowadays, and credit cards are favoured
                        instead.
                      </p>

                      <p>
                        8. Know what to do in case you lose your card or aren’t
                        carrying one
                      </p>
                      <p>
                        If you know someone back home who is willing to send you
                        a moneygram, that may be a viable option. However, some
                        bank accounts will also let you withdraw cash from one
                        of their branches abroad with identification:{" "}
                        <em>
                          make a note of their overseas phone number before you
                          travel.
                        </em>
                      </p>
                      <p>
                        Another great way to get out of trouble is to carry
                        $50USD with you as your emergency stash. This is
                        accepted in the majority of countries, and might help
                        you out if you find yourself with no access to money
                        overseas.
                      </p>

                      <p>
                        <em>
                          Source:{" "}
                          <a href="https://www.skyscanner.co.nz/news/the-best-ways-to-exchange-transfer-and-use-foreign-currency-when-travelling">
                            https://www.skyscanner.co.nz/news/the-best-ways-to-exchange-transfer-and-use-foreign-currency-when-travelling
                          </a>
                        </em>
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className="mb-2 flex-1">
                    <Accordion.Header>
                      <h5>
                        Exchange Rates 101: Get Answers to 12 Common Questions
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h3>
                        Exchange Rates 101: Get Answers to 12 Common Questions
                      </h3>

                      <p>1. What are exchange rates?</p>

                      <p>
                        An exchange rate is the value of a certain currency as
                        compared to a foreign currency. Each country’s money has
                        a unique value compared to another country’s money. In
                        other words, the exchange rate determines how much of
                        one currency you get for that amount in another
                        currency.
                      </p>

                      <p>
                        As of November 2021, for example, five U.S. dollars will
                        get you 650 Icelandic króna, about 32 Chinese yuan, 15.5
                        Israeli new shekels, and just 4.3 euros. There’s a big
                        difference, as you can see.
                      </p>

                      <p>
                        <strong>
                          <u>International exchange rates</u>
                        </strong>{" "}
                        fluctuate daily and can be widely different from one
                        nation to another. The value of a currency is very much
                        dependent on the country’s economic situation, as well
                        as other factors, such as monetary policy, global trade,
                        and political stability.
                      </p>

                      <p>2. How are exchange rates determined?</p>
                      <p>
                        Foreign exchange rates <strong>vary</strong> based on
                        supply and demand and other economic factors. No single
                        bank, government, or financial service determines an
                        exchange rate. Instead, they fluctuate based on global
                        market conditions.
                      </p>
                      <p>
                        As supply and demand go up, the value of the currency
                        increases. As supply and demand decrease, so does the
                        value of that country’s currency. Exchange rates have a
                        direct link to the country’s economic prosperity.
                      </p>
                      <p>
                        Many other factors can affect exchange rates, including
                        public debt, interest rates, inflation, and even the
                        country’s deficit.
                      </p>
                      <p>
                        In other words, the economic health of a nation has a
                        direct impact on the value of that nation’s currency in
                        the global market.
                      </p>

                      <p>3. Why do exchange rates change daily?</p>
                      <p>
                        Money exchange rates constantly fluctuate because global
                        markets change daily. Interest rates, supply and demand,
                        and other economic factors change day by day—and by the
                        minute!
                      </p>
                      <p>
                        Exchange rates fluctuate at the same speed. Money
                        exchange rates are an up-to-date reflection of the
                        economic health of that nation, and the value of their
                        currency changes as the country’s economy changes.
                      </p>

                      <p>4. Is a higher or lower exchange rate better?</p>
                      <p>
                        The terms “higher” or “lower” exchange rate depend on
                        the specific currencies and the context or goals of the
                        parties involved. A higher exchange rate indicates a
                        stronger currency, benefiting importers and travelers
                        from the stronger currency’s country while boosting
                        exporters in the weaker currency’s region.
                      </p>
                      <p>
                        Conversely, a lower exchange rate signifies a weaker
                        currency, benefiting exporters and travelers from the
                        weaker currency’s country and importers in the stronger
                        currency’s region.
                      </p>
                      <p>
                        Ultimately, whether a higher or lower exchange rate is
                        better relies on the situation and objectives of the
                        stakeholders, as their preferences may vary based on
                        their needs.
                      </p>

                      <p>5. Why is the exchange rate important?</p>
                      <p>
                        Currency exchange rates are important because they also
                        determine the value of goods in the U.S. and overseas.
                        For example, the value at which you sell U.S. products
                        overseas depends on the exchange rate. It also affects
                        how the cost of imported goods in comparison to local
                        goods.
                      </p>
                      <p>
                        The exchange rate directly impacts the value of imports,
                        which can also affect both supply and demand in the
                        global market. That means it will affect the{" "}
                        <strong>exchange rate of the U.S. dollar.</strong>
                      </p>

                      <p>6. How does inflation affect exchange rates?</p>
                      <p>
                        Inflation has a direct impact on interest rates, which
                        play a big role in determining foreign exchange rates.
                        Inflation can cause interest rates to skyrocket or drop
                        very low.
                      </p>
                      <p>
                        This, in turn, can affect the exchange rate of different
                        currencies in the global market.
                      </p>
                      <p>
                        The value of money is no longer backed by gold, but by
                        governments{" "}
                        <strong>
                          (<u>fiat money</u>)
                        </strong>
                        , so inflation can fluctuate and rise more easily than
                        it did in the 1970s and before.
                      </p>

                      <p>7. What makes the dollar (USD) strong or weak?</p>
                      <p>
                        The United States dollar, or USD, is perhaps the most
                        powerful currency in the world. A strong United States
                        dollar allows you to buy more of another currency. A
                        weak dollar means you can buy less of another currency
                        for your dollar.
                      </p>
                      <p>
                        <strong>Note:</strong> other{" "}
                        <strong>
                          <u>strong currencies</u>
                        </strong>{" "}
                        include the euro (EUR), British pound (GBP), Japanese
                        yen (JPY), Swiss franc (CHF), and the Saudi riyal (SAR).
                      </p>
                      <p>
                        The strength of the dollar depends on the country’s
                        economic health. Low debts and increasing supply and
                        demand can be helpful in strengthening the dollar.
                      </p>
                      <p>
                        On the other hand, high unemployment, rising debt, and
                        decreasing supply and demand can weaken the dollar.
                      </p>
                      <p>
                        Did you know? The U.S. isn’t the only country using
                        dollars. Other well-known dollars include: the Canadian
                        dollar (CAD), Australian dollar (AUD), New Zealand
                        dollar, Singapore dollar, and Hong Kong dollar.
                      </p>

                      <p>8. What can also increase an exchange rate?</p>
                      <p>
                        When there is a high demand for a country’s currency,
                        the value of the currency will increase. The exchange
                        rate can also increase as a country’s economic health
                        improves.
                      </p>
                      <p>
                        Increases in interest rates and trade can also create a
                        favorable exchange rate. For example, many countries
                        purchase goods in U.S. dollars. If more nations choose
                        to use U.S. funds, then more nations will buy up U.S.
                        dollars, which can increase the U.S. dollar’s value even
                        further.
                      </p>

                      <p>9. What can also decrease an exchange rate?</p>
                      <p>
                        An exchange rate can decrease as the value of the dollar
                        decreases. Economic distress, lower demand for the
                        country’s currency in the global market, less supply and
                        demand for exports, and decreasing interest rates can
                        all weaken the value of the dollar.
                      </p>
                      <p>
                        As the dollar weakens, the exchange rate can decrease.
                        These types of fluctuations can vary day by day.
                      </p>

                      <p>10. What is a floating exchange rate?</p>
                      <p>
                        A floating exchange rate is when the exchange rate
                        varies based on supply and demand in the{" "}
                        <strong>
                          <u>Forex market</u>
                        </strong>{" "}
                        (foreign exchange market) in relation to other
                        countries. This means there will be wide variability in
                        money exchange rates, and the value of the exchange
                        rates can change dramatically based on economic factors.
                      </p>
                      <p>
                        Floating exchange rates are common in countries using
                        fiat currencies.
                      </p>

                      <p>11. What is a fixed exchange rate?</p>
                      <p>
                        A fixed exchange rate system is when a central bank
                        bases the value of its currency on a set factor or
                        commodity. Formerly, this would have been gold.
                        Nowadays, a fixed exchange rate generally means that the
                        value of that currency is determined in comparison to a
                        select few others. The{" "}
                        <strong>
                          <u>Senegal West African CFA franc</u>
                        </strong>{" "}
                        is one example.
                      </p>
                      <p>
                        Very few countries still follow this model. Most follow
                        the fiat model, wherein the government backs the
                        currency.
                      </p>

                      <p>12. How to find an exchange rate</p>
                      <p>
                        To find exchange rates for different currencies, you can
                        check online or with your favorite bank. Many financial
                        services publish current exchange rates on their
                        websites.
                      </p>
                      <p>
                        When you’re ready, you can purchase or sell different
                        currencies at banks or exchange counters. You can also
                        send money overseas using a money transfer service or
                        app. Often, the exchange rate will be marked up to
                        account for the cost of the transfer, though not always.
                      </p>
                      <p>
                        When{" "}
                        <strong>
                          <u>sending money to another country</u>
                        </strong>
                        , follow the exchange rates for your currency pair, and
                        get familiar with them. This way, you’ll know when the
                        exchange rates are in your favor.
                      </p>
                      <p>
                        Another way to follow the exchange rate? Keep up with
                        global news. Economic developments and political changes
                        can give you some insight into how the money exchange
                        rate will vary in the coming weeks or days.
                      </p>
                      <p>
                        <em>Source: Remitly</em>
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className="mb-2 flex-1">
                    <Accordion.Header>
                      <h5>
                        Important Tips to Help You Identify Counterfeit Money
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h3>
                        Important Tips to Help You Identify Counterfeit Money
                      </h3>

                      <p>
                        Identifying counterfeit money can be challenging and
                        counterfeiters are continually improving their
                        techniques. We want to help you protect yourself from
                        accepting counterfeit money and experiencing a loss.
                        There are several security features on genuine banknotes
                        that you can use to help spot counterfeit money.
                      </p>

                      <h4>
                        Here are some tips on how to identify counterfeit
                        currency:
                      </h4>

                      <p>
                        <strong>1. Feel the paper:</strong> Genuine currency is
                        typically printed on special paper that has a distinct
                        texture and feel. It should feel slightly rough to the
                        touch, not smooth or glossy like regular printer paper.
                      </p>

                      <p>
                        <strong>2. Check for watermark:</strong> Hold the
                        banknote up to the light to see if it has a watermark. A
                        watermark is a faint image or pattern that becomes
                        visible when you hold the bill up to the light. The
                        watermark should match the portrait on the bill.
                      </p>

                      <p>
                        <strong>3. Look for security threads:</strong> Most
                        genuine banknotes have a thin, embedded security thread
                        that runs vertically through the bill. Hold the bill up
                        to the light, and you should see the thread with text or
                        a denomination repeated on it.
                      </p>

                      <p>
                        <strong>4. Examine the color-shifting ink:</strong> Some
                        denominations have ink that changes color when tilted.
                        For example, on the new U.S. $100 bill, the “100”
                        changes from copper to green when tilted.
                      </p>

                      <p>
                        <strong>5. Inspect the microprinting:</strong> Genuine
                        banknotes often have tiny, intricate text that is
                        difficult for counterfeiters to replicate. Use a
                        magnifying glass, if necessary, to check for
                        microprinting.
                      </p>

                      <p>
                        <strong>6. Feel for raised print:</strong> On most
                        modern banknotes, certain elements, like the
                        denomination or the Treasury seal, have raised ink that
                        you can feel with your fingers.
                      </p>

                      <p>
                        <strong>7. Check for ultraviolet (UV) features:</strong>{" "}
                        Under a UV light source, genuine banknotes may display
                        fluorescent patterns or markings. Counterfeit notes may
                        not react the same way under UV light.
                      </p>

                      <p>
                        <strong>
                          8. Verify the security thread’s location:
                        </strong>{" "}
                        Ensure that the security thread is in the correct
                        location for the denomination of the banknote. Different
                        denominations may have different positions for the
                        thread.
                      </p>

                      <p>
                        <strong>
                          9. Examine the holograms or color-shifting images:
                        </strong>{" "}
                        Some newer U.S. notes, have holograms or color-shifting
                        images that change when you tilt the bill.
                      </p>

                      <p>
                        <strong>10. Be cautious of irregularities:</strong> Look
                        for any irregularities, such as blurred or uneven
                        printing, missing security features, or unusual colors.
                        Counterfeiters often make mistakes that can be detected
                        upon close inspection.
                      </p>

                      <p>
                        <strong>11. Compare with a genuine note:</strong> If you
                        suspect a bill may be counterfeit, compare it with a
                        known genuine note of the same denomination and series.
                        Look for differences in design, size, and security
                        features.
                      </p>

                      <p>
                        <strong>12. Trust your instincts:</strong> If something
                        about a banknote doesn&apos;t feel right, trust your
                        instincts and exercise caution.
                      </p>

                      <p>
                        <strong>Source: Natco Credit Union</strong>
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </p>
              <BackButton />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Blog;
