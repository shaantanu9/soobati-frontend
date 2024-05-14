// // SDK initialization

// // var ImageKit = require('imagekit');

// import ImageKit from 'imagekit-javascript';
import {_productService} from '../services/api/product/product.service';
// export const uploadImageToIamgeKit = async (images: any) => {
//   const imagesUrl: any = [];
//   const thumbnailUrl: any = [];
//   for (const uri of images) {
//     const res = await _productService.getImageKitAuth();
//     const imagekit = new ImageKit({
//       publicKey: 'public_FDC/RCuLLeKyD5vinpopNKvqd0U=',
//       urlEndpoint: 'https://ik.imagekit.io/soobati/',
//     });

//     imagekit.upload(
//       {
//         file: uri.base64,
//         fileName: uri.fileName,
//         tags: ['tag1'],
//         token: res.data.token,
//         signature: res.data.signature,
//         expire: res.data.expire,
//       },
//       function (err: any, result: any) {
//         console.log('Inside Imagekit callback');
//         if (err) {
//           console.log(err, 'ERROR');
//         }

//         imagesUrl.push(result.url);
//         thumbnailUrl.push(result.thumbnailUrl);
//       },
//     );
//   }
//   return {imagesUrl, thumbnailUrl};
// };

// // const uploadImageToImageKit = async (uri: any, resize = false) => {
// //   const uploadCredentials = await getUploadCredentials();
// //   const formData: any = new FormData();
// //   formData.append('file', {
// //     uri: uri,
// //     type: 'image/jpeg', // Adjust based on your image type
// //     name: `${uuidv4()}.jpg`,
// //   });
// //   formData.append('publicKey', uploadCredentials.publicKey);
// //   formData.append('signature', uploadCredentials.signature);
// //   formData.append('expire', uploadCredentials.expire);
// //   formData.append('token', uploadCredentials.token);

// //   // Conditional resizing
// //   if (resize) {
// //     formData.append(
// //       'transformation',
// //       JSON.stringify([
// //         {
// //           height: '300',
// //           width: '400',
// //           format: 'jpg',
// //         },
// //       ]),
// //     );
// //   }

// //   try {
// //     const response = await fetch(
// //       'https://upload.imagekit.io/api/v1/files/upload',
// //       {
// //         method: 'POST',
// //         body: formData,
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       },
// //     );
// //     const result = await response.json();
// //     if (response.ok) {
// //       console.log('Uploaded successfully:', result);
// //       return result.url; // Returns the URL of the uploaded image
// //     } else {
// //       console.error('Upload failed:', result);
// //     }
// //   } catch (error) {
// //     console.error('Error uploading image:', error);
// //   }
// // };

import ImageKit from 'imagekit-javascript';

export const uploadImageToImageKit = async (
  images: any,
  folderName: string = '',
) => {
  const imagesUrl: any = [];
  const thumbnailUrl: any = [];

  // Fetch authentication once if it can be reused for multiple uploads
  const imagekit = new ImageKit({
    publicKey: 'public_FDC/RCuLLeKyD5vinpopNKvqd0U=',
    urlEndpoint: 'https://ik.imagekit.io/soobati/',
  });
  // console.log('Inside uploadImageToImageKit function', images, folderName);
  const uploadPromises = images.map(async (uri: any) => {
    const auth = await _productService.getImageKitAuth();
    // console.log('Inside uploadPromise function');
    return new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: uri.base64,
          fileName: uri.fileName,
          tags: ['tag1'],
          token: auth.data.token,
          signature: auth.data.signature,
          expire: auth.data.expire,
          folder: folderName,
        },
        (err: any, result: any) => {
          if (err) {
            console.log(err, 'ERROR');
            reject(err);
          } else {
            console.log('Upload successful', result);
            imagesUrl.push(result.url);
            thumbnailUrl.push(result.thumbnailUrl);
            resolve(result);
          }
        },
      );
    });
  });

  // Wait for all promises to resolve
  await Promise.all(uploadPromises);

  return {imagesUrl, thumbnailUrl};
};
