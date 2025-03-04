const presence = new Presence({
    clientId: '654906151523057664',
  });
  
  const browsingTimestamp = Math.floor(Date.now() / 1000);
  
  // Basic Presence data
  let presenceData: PresenceData = {
    details: '',
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/G/GeoGuessr/assets/logo.png',
    startTimestamp: browsingTimestamp,
  };
  
  // Whenever PreMiD requests an update, check the URL and set the Presence
  presence.on('UpdateData', async () => {
    const href = window.location.href;
    let detailsText = ''; // starts empty
  
    // 1. Party
    if (href.includes('/party')) {
      detailsText = 'Playing party with friends';
    }
    // 2. Team Duels
    else if (href.includes('/multiplayer/teams')) {
      detailsText = 'Playing Team Duels';
    }
    // 3. Duels
    else if (href.includes('/multiplayer')) {
      detailsText = 'Playing Duels';
    }
    // 4. Regular game
    else if (window.location.pathname.startsWith('/game')) {
      // Try to get the map name
      // data-qa="map" or the generic class .status_value__w_Nh0
      const mapName =
        document.querySelector('[data-qa="map"] .status_value__w_Nh0')?.textContent ||
        document.querySelector('.status_value__w_Nh0')?.textContent ||
        'Unknown';
  
      detailsText = `Map: ${mapName}`;
    }
  
    // Assign to Presence
    presenceData.details = detailsText;
    presenceData.state = ''; // no second line
  
    presence.setActivity(presenceData);
  });
  
  