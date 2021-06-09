import axios from 'axios';
interface UploadImageReturnProps {
  url: string;
  size: number;
  height: number;
  width: number;
}
export const uploadImage = async (
  image: File,
): Promise<UploadImageReturnProps> => {
  let req = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('image', image);
  const { data } = await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};