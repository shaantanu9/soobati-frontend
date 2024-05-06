/* The code you provided is importing various icons and images from different files and defining two
arrays: `OnBoardingData` and `LanguageData`. */

import images from '../assets/images';
import dayjs from 'dayjs';
export const OnBoardingData = [
  {
    image: images.onBoardingImage1,
  },
  {
    image: images.onBoardingImage2,
  },
  {
    image: images.onBoardingImage3,
  },
];

export const LanguageData = [
  {
    name: 'English (UK)',
    id: 1,
  },
  {
    name: 'English',
    id: 2,
  },
  {
    name: 'Bahasa Indonesia',
    id: 3,
  },
  {
    name: 'Chinese',
    id: 4,
  },
  {
    name: 'Croatian',
    id: 5,
  },
  {
    name: 'Czech',
    id: 6,
  },
  {
    name: 'Danish',
    id: 7,
  },
  {
    name: 'Filipino',
    id: 8,
  },
  {
    name: 'Finland',
    id: 9,
  },
];

export const BookData = [
  {
    id: 1,
    image: images.bookImage1,
    title: 'The trials of apollo the burning maze',
    subTitle: 'Action, Adventure',
    msg: 'Greek Mythology, Fantasy',
    payNow: 'Pay Now $ 79',
    originalPrice: '$69',
    soldBy: '2036',
    tax: '$10',
    total: '$79',
    invoiceNumber: '#135675323',
    date: 'July 16 2022',
    withoutDiscountPrice: '$138',

    rating: 5,
    noOfPeopleRated: 1029,
    author: 'By Mark Manson',
    discount: '50% Off',
    chapterName: 'Mindset not to care ',
    bookTitleText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    bookParagraphText1:
      ' When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
    bookParagraphText2:
      ' Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    bookParagraphHighlightText:
      "“ orem Ipsum has been the industry's standard dummy text ever since the 1500s ”",
    bookParagraphText3:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 2,
    image: images.bookImage2,
    title: 'Sun Tzu - The Art of War: Strategies for competition',
    subTitle: 'Action, Adventure',
    msg: 'Strategic, Fantasy',
    payNow: 'Pay Now $ 75',
    originalPrice: '$72',
    soldBy: '2036',
    tax: '$3',
    total: '$75',
    invoiceNumber: '#135675323',
    date: 'July 16 2022',

    rating: 4,
    noOfPeopleRated: 1029,
    author: 'By Mark Manson',
    chapterName: 'Mindset not to care ',
    bookTitleText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    bookParagraphText1:
      ' When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
    bookParagraphText2:
      ' Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    bookParagraphHighlightText:
      "“ orem Ipsum has been the industry's standard dummy text ever since the 1500s ”",
    bookParagraphText3:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 3,
    image: images.bookImage4,
    title: 'The Book of Ikigai',
    subTitle: 'Action, Adventure',
    msg: 'Strategic, Fantasy',
    payNow: 'Pay Now $ 79',
    originalPrice: '$72',
    soldBy: '2036',
    tax: '$7',
    total: '$79',
    invoiceNumber: '#135675323',
    date: 'July 16 2022',

    rating: 2,
    noOfPeopleRated: 1029,
    author: 'By Mark Manson',
    chapterName: 'Mindset not to care ',
    bookTitleText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    bookParagraphText1:
      ' When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
    bookParagraphText2:
      ' Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    bookParagraphHighlightText:
      "“ orem Ipsum has been the industry's standard dummy text ever since the 1500s ”",
    bookParagraphText3:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    id: 4,
    image: images.bookImage3,
    title:
      'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
    subTitle: 'Action, Adventure',
    msg: 'Self Development',
    originalPrice: '$169',
    payNow: 'Pay Now $ 174',
    soldBy: '2036',
    tax: '$5',
    total: '$174',
    invoiceNumber: ' #135675323',
    date: 'July 16 2022',

    rating: 3,
    noOfPeopleRated: 1029,
    author: 'By Mark Manson',
    chapterName: 'Mindset not to care ',
    bookTitleText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    bookParagraphText1:
      ' When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
    bookParagraphText2:
      ' Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    bookParagraphHighlightText:
      "“ orem Ipsum has been the industry's standard dummy text ever since the 1500s ”",
    bookParagraphText3:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
 
];


export const SubscriptionData = [
]

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const YEARS = [
  
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
]



export const WEEKDAYS =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
