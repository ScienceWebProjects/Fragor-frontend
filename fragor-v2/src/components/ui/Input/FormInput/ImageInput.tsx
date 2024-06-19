import React, { useState } from 'react';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
import FormInputProps from './input_props';
import { FormattedMessage } from 'react-intl';

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageInput: React.FC<FormInputProps> = ({ input, meta, type }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as Blob);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({
    fileList: newFileList,
  }: UploadChangeParam<UploadFile>) => {
    setFileList(newFileList);
    input.onChange(newFileList); // pass value to react-final-form
  };

  const beforeUpload = () => {
    return false; // prevent auto upload
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        <FormattedMessage
          id='upload'
          defaultMessage={'Upload'}
        />
      </div>
    </button>
  );

  return (
    <>
      <Upload
        accept='image/png, image/jpeg'
        beforeUpload={beforeUpload}
        listType='picture-circle'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageInput;
