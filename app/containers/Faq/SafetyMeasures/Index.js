import React, { useContext } from 'react';
import { makeStyles, Box, Button, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '50px auto 0',
    width: '100%',
    overflow: 'hidden',
    padding: '0 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  heading: {
    fontSize: 35,
    fontWeight: 700,
    marginLeft: 10,
  },
  policyContent: {
    '& h3': {
      marginBottom: '0',
      textTransform: 'capitalize',
    },
    '& .alpha': {
      listStyleType: 'lower-alpha',
    },
    '& .number': {
      listStyleType: 'decimal',
    },
    '& .roman': {
      listStyleType: 'upper-roman',
    },
    '& ul': {
      padding: '0 0 0 17px',
      '& li': {
        marginBottom: '16px',
        fontSize: '14px',
        textAlign: 'justify',
        lineHeight: '1.5',
      },
    },
    '& p': {
      marginBottom: '16px',
      fontSize: '14px',
      textAlign: 'justify',
      lineHeight: '1.5',
    },
  },
  desc: {
    fontSize: 20,
  },
}));

function SafetyMeasures() {
  const classes = useStyles();
  const { history } = useContext(HistoryContext);

  return (
    <div className={classes.appWrapper}>
      <Box
        display="flex"
        alignItems="center"
        pb={2}
        mb={6}
        style={{ borderBottom: '1px solid #000' }}
      >
        <div className={classes.heading}>SAFETY MEASURES</div>
      </Box>
      <div className={classes.policyContent}>
        <h3> </h3>
        <p>
          <p>
            To ensure that your order is delivered safely, we regularly send
            reminders to our delivery partners on best practices of respiratory
            hygiene, proper method and frequency of hand washing, as well as
            identification of associated symptoms.
          </p>
        </p>
        <p>
          Credible bodies like the Food and Safety Standards Authority of India
          and the Centres for Disease Control and Prevention have clarified that
          food hasn’t been found to be a medium of transmission of COVID-19.
          However, in order to minimize the low risk of transmission through
          your delivery experience even further, here are a few of the many
          measures we have implemented:
        </p>
        <h3>Delivery Partner Training </h3>
        <ul className="dot">
          <p>
            To ensure that your order is depvered safely, we regularly send
            reminders to our delivery partners on best practices of respiratory
            hygiene, proper method and frequency of hand washing, as well as
            identification of associated symptoms.
          </p>
        </ul>
        <h3>Masks for Delivery Partners </h3>
        <ul className="dot">
          <p>
            We have been working hard to get masks to all our delivery partners,
            so that, throughout the process, during which, the food is being
            handled, proper hygiene is maintained.
          </p>
        </ul>
        <h3>No-Contact Delivery </h3>
        <ul className="dot">
          <p>
            To make deliveries safer for you and for our delivery partners, we
            continue to have the option of no -contact delivery. By opting in
            for a no-contact delivery, you can maintain social distancing
            between you and your delivery partner. In this case, your order will
            be dropped off at your gate or door, which you can then pick up at
            your convenience.
          </p>
        </ul>
        <h3>Restaurant Partner Advisory</h3>
        <ul className="dot">
          <p>
            To facilitate the safe and hygienic preparation of every order, we
            have shared a detailed advisory with all of our restaurant partners
            on best practices to be followed. These include hand washing
            regimes, mandatory temperature checks, use of 3-ply face masks for
            all staff, self-quarantine measures in case of any illness, and
            sanitization facilities for delivery partners at the order pick-up
            points. In an effort to keep your order protected from any contact
            during transit, we are also urging partners to pack all orders in
            separate bags.
          </p>
        </ul>
        <h3>Our Safety Measures</h3>
        <ul className="dot">
          <p>Measures we have taken to arrest the spread</p>
          <p>
            The presence of a few delivery partners on the roads helps keep
            millions of Indians safe indoors. In the rare instance of a delivery
            partner testing positive or displaying symptoms despite following
            all the safety measures we have in place, here’s what we do to keep
            you and them safe:
          </p>
        </ul>
        <h3 />
        <ul className="dot">
          <li>
            The infected (or suspected to be infected) delivery partner is
            immediately asked to stop delivering orders temporarily.
          </li>
          <li>
            The delivery partner is redirected to the nearest available doctor
            to get tested and/or treated. The delivery partner is also
            immediately quarantined.
          </li>
          <li>
            We then identify other delivery partners who were in recent contact
            with the infected (or suspected to be infected) delivery partner.
            They too are asked to stop delivering temporarily, are asked to be
            tested, and made to self-isolate for the recommended period.
          </li>
          <li>
            Any customer and restaurant the infected (or suspected to be
            infected) delivery partner may have come into contact with are
            identified and intimated with the help of local authorities.
          </li>
          <li>
            {' '}
            All of the above steps are completed within 24 hours of our being
            made aware of such an incident.
          </li>
          <li>
            Any delivery partner who is temporarily on leave, due to Covid, are
            well protected. Income protection and medical insurance programmes
            are also in place to support them financially.
          </li>
        </ul>
        <h3>
          Simple things to do at your end, to make your food order risk-free:
        </h3>
        <ul className="dot">
          <p>Before & While Receiving Your Order:</p>
        </ul>
        <li>
          The delivery partner is redirected to the nearest available doctor to
          get tested and/or treated. The delivery partner is also immediately
          quarantined.
        </li>
        <li>
          Go Cashless. Pay online so that you can avoid exchanging cash, thus
          limiting or completely eliminating your contact with multiple people.
        </li>
        <li>
          Opt for No-contact Delivery, with No-contact Delivery, your order will
          be left at your gate or door so you can practice social distancing.
          For additional hygiene, please leave a bag, table or stool outside
          where you order can be left.
        </li>
        <li>
          Limit Package Handling to One Person, Ideally, only the person
          receiving the order/package should handle the package, till the outer
          packaging has been discarded. It is also, recommended that elderly
          people do not handle packages themselves in these times.
        </li>
        <p>After Receiving Your Order:</p>
        <li>
          Discard Outer Packaging & Transfer Your Food, dispose off outer covers
          like paper or plastic bags immediately after receiving your food. It
          is also recommended that you transfer the food from the container to
          your own vessel before consumption.
        </li>
        <li>
          Wash Your Hands, once the packaging has been discarded, wash your
          hands with soap and water for at least 20 seconds. Repeat before
          consuming food (and at regular intervals throughout the day).
        </li>
        <li>
          Reheat Your Food, persistent exposure to high temperatures can kill
          any potential bacteria or viruses. So, for your safety, we recommend
          reheating your food before consumption.
        </li>
      </div>
    </div>
  );
}

export default SafetyMeasures;
