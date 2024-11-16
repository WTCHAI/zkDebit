
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { useEffect, useRef, useState } from 'react';
import { Button, Box } from '@mui/material';

import axios from 'axios';

export const worldID = async () => {
  // const proof = await verifyCloudProof(worldID);
  const app_id = 'app_staging_b2ffa0200a5afbb92911a4f8ccb04f25';
  const action = 'test-prod';
  const signal = 'test-prod';
  const openWidgetRef = useRef(null); // Define the ref at the component level
  const [isSubmitted, setIsSubmitted] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    if (openWidgetRef.current) {
      openWidgetRef.current(); // Automatically call the open function after render

    }
  }, []);


  // Callback when the proof is received
  const handleVerify = async (response) => {
    console.log('Received verification data:', response);

    const ob = {
      proof: response,
      app_id,
      action,
      signal,
    };

    try {
      const res = await fetch("http://localhost:4000/verify", {
        method: 'POST', // Set the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ob),
      });

      // Handle the response
      const data = await res.json();
      setVerificationResult(data);

      if (!res.ok) {
        console.error('Verification failed:', data);
      }
      console.log("done proof human:", data);
      alert("all done");
    } catch (error) {
      console.error('Verification Failed:', error);
      setVerificationResult({ success: false, message: 'Verification failed.' });
    }
  };

  const onSuccess = (response) => { console.log('onSuccess:', response); }



  // Function to parse query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  // Extract `txHashed` and `amount` from the URL parameters
  const queryParams = getQueryParams(location.search);
  const txHashed = queryParams.get("txHashed");
  const amount = queryParams.get("amount");
  return (
    //   <div>
    //   <IDKitWidget
    //     app_id="app_staging_b2ffa0200a5afbb92911a4f8ccb04f25"
    //     action={action}
    //     signal={signal}
    //     verification_level={VerificationLevel.orb}
    //     handleVerify={handleVerify}
    //     onSuccess={onSuccess}

    //   >
    //     {({ open }) => {
    //       openWidgetRef.current = open;
    //     }}
    //   </IDKitWidget>
    // </div>
    <div>

      <h1>Worldcoin IDKit Integration</h1>
      <IDKitWidget
        app_id="app_staging_b2ffa0200a5afbb92911a4f8ccb04f25"
        action={action}
        signal={signal}
        verification_level={VerificationLevel.orb}
        // verification_level={VerificationLevel.OrbPlus}
        handleVerify={handleVerify}
        onSuccess={onSuccess}
      // advanced={
      //   self_hosted // enable the self-hosted mode
      // }
      >
        {({ open }) => (
          <Button
            variant="contained"
            onClick={open}
            sx={{
              backgroundColor: '#000',
              color: '#FFF',
              borderRadius: '999px',
              padding: '12px 24px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            <Box
              component="img"
              src={worldcoinLogo}
              alt="Worldcoin logo"
              sx={{
                width: 30,
                height: 30,
                marginRight: '8px',
              }}
            />
            Verify with Worldcoin
          </Button>

        )}
      </IDKitWidget>

    </div>
  )
  return
};

