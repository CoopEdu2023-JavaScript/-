import React from 'react';
import { Modal } from '@douyinfe/semi-ui';

const LuckyStudentModal = ({ visible, currentStudent, handleOk, handleCancel }) => {
  return (
    <Modal
      title="幸运儿"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {currentStudent ? currentStudent.name : "没有选中的学生"}
    </Modal>
  );
};

export default LuckyStudentModal;