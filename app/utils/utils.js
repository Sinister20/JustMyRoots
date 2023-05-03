export const getFormatedTime = timeStr => {
  if (timeStr.endsWith('PM' || 'AM')) {
    return '';
  } else {
    const timer = timeStr.split('-');
    let Ltime = '';
    let Rtime = '';
    if (+timer[0] > 12) {
      Ltime = `${+timer[0] - 12}PM`;
    } else {
      Ltime = `${+timer[0]}AM`;
    }
    if (+timer[1] > 12) {
      Rtime = `${+timer[1] - 12}PM`;
    } else {
      Rtime = `${+timer[1]}AM`;
    }
    return `${Ltime} - ${Rtime}`;
  }
};

export const sliderOptions = {
  margin: 0,
  nav: true,
  dots: false,
  autoplay: false,
  loop: false,
  items: 4,
  navText: [
    `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
        <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
    `<div class='next-slide'>
        <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
        <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
  ],
  responsive: {
    0: {
      items: 1.6,
      nav: false,
      center:true,
    },
    450: {
      items: 1.6,
      nav: false,
      center:true,
    },
    600: {
      items: 2.2,
      nav: false,
    },
    1000: {
      items: 4,
    },
  },
};


export const sliderOptions2 = {
  margin: 1,
  nav: true,
  dots: false,
  autoplay: true,
  loop: true,
  // merge:true,
  // startPosition:1,
  items: 4.2,
  freeDrag:true,
  // center:true,
  navText: [
    `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
        <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
    `<div class='next-slide'>
        <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
        <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
  ],
  responsive: {
    0: {
      items: 1.6,
      nav: false,
      center:true,
    },
    450: {
      items: 1.6,
      nav: false,
      center:true,
    },
    600: {
      items: 2.2,
      nav: false,
    },
    1000: {
      items: 4,
    },
  },
};

export const sliderOptionsBanner = {
  margin: 1,
  nav: true,
  dots: true,
  autoplay: true,
  loop: true,
  items: 1.3,
  center:true,
  navText: [
    `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
      <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
    `<div class='next-slide'>
      <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
      <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
      <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
  ],
};

export const searchQueryParser = key => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const search = params.get(key);
  return search;
};

export function checkImageURL(url = null) {
  if (url && url.match(/\.(jpeg|jpg|JPG|gif|png|jfif)$/) != null) {
    return url;
  }
  return `https://i.ibb.co/0FTjTZs/placeholder-img.png`;
}

export function setItemToLocalStorage(key) {
  return function(value) {
    window.localStorage.setItem(key, value);
  };
}
export function getItemFromLocalStorage(key) {
  return window.localStorage.getItem(key);
}
export function removeItemFromLocalStorage(key) {
  window.localStorage.removeItem(key);
}

export const getItemsSortedByPriorityName = (a, b) => {
  let p1 = parseInt(a.priority);
  let p2 = parseInt(b.priority);
  if (p1 < p2) {
    return 1;
  }
  if (p1 > p2) {
    return -1;
  }
  return  a.itemName.localeCompare(b.itemName);
}

export const getBuildDate = (epoch) => {
  const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
  return buildDate;
};
