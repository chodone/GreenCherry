import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './index.module.scss';

import AllergyButton from '@/components/AllergyButton';
import Container from '@/components/Container';

const Join = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });

  const [businessLicenseValidate, setBusinessLicenseValidate] = useState(false);
  const [businessPermissionValidate, setBusinessPermissionValidate] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [allergyIdList, setAllergyIdList] = useState([]);

  // TODO: 서버에서 받아온 데이터로 변경
  const [allergyList, setAllergyList] = useState([
    { id: '1', name: '계란' },
    { id: '2', name: '우유' },
  ]);

  const handleDateChange = e => {
    const dateValue = e.target.value;
    const formattedDate = dateValue.replaceAll('-', '');
    setSelectedDate(formattedDate);
  };

  const handleAllergyBtnClick = e => {
    const { value } = e.target;
    if (allergyIdList.includes(value)) {
      setAllergyIdList(allergyIdList.filter(allergyId => allergyId !== value));
    } else {
      setAllergyIdList([...allergyIdList, value]);
    }
  };

  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary">
        <form>
          <div className="text-bgcolor text-center mb-24">
            <h1 className="text-7xl mt-20 mb-6">RESISTE YOUR STORE</h1>
            <h3 className="text-4xl font-thin">
              남은 음식을 수익으로 바꿔봐요
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('name', {
                  required: true,
                })}
                autoComplete="off"
                id="name"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-96  bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="상호명"
              />
              <label
                htmlFor="name"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                상호명
              </label>
            </div>
            {errors.name && errors.name.type === 'required' && (
              <p className={style['error-text']}>상호명을 입력해주세요</p>
            )}
            <div className="relative my-5 border-b-2 border-bgcolor w-96 flex">
              <div className="w-80 overflow-hidden">
                <input
                  {...register('businessLicenseNumber', {
                    required: true,
                    pattern: /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
                    validate: businessLicenseValidate,
                  })}
                  autoComplete="off"
                  id="businessLicenseNumber"
                  type="text"
                  className="text-2xl peer placeholder-transparent h-10 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                  placeholder="사업자 등록 번호"
                />
                <label
                  htmlFor="businessLicenseNumber"
                  className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
                >
                  사업자 등록 번호
                </label>
              </div>
              <button type="button" className={`${style['check-button']}`}>
                확인하기
              </button>
            </div>
            {errors.businessLicenseNumber &&
              errors.businessLicenseNumber.type === 'required' && (
                <p className={style['error-text']}>
                  사업자 등록 번호를 입력해주세요
                </p>
              )}
            {errors.businessLicenseNumber &&
              errors.businessLicenseNumber.type === 'pattern' && (
                <p className={style['error-text']}>
                  사업자 등록 번호를 올바르게 입력해주세요
                </p>
              )}
            {errors.businessLicenseNumber &&
              errors.businessLicenseNumber.type === 'validate' && (
                <p className={style['error-text']}>
                  사업자 등록 번호를 확인해주세요
                </p>
              )}
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('ownerName', {
                  required: true,
                  pattern: /^[가-힣]{2,10}$/,
                })}
                autoComplete="off"
                id="ownerName"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-96 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="대표자 성명"
              />
              <label
                htmlFor="ownerName"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                대표자 성명
              </label>
            </div>
            {errors.ownerName && errors.ownerName.type === 'required' && (
              <p className={style['error-text']}>대표자 성명을 입력해주세요</p>
            )}
            {errors.ownerName && errors.ownerName.type === 'pattern' && (
              <p className={style['error-text']}>
                대표자 성명은 2~10자 한글로 입력해주세요
              </p>
            )}
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('startDate', {
                  required: true,
                })}
                autoComplete="off"
                id="startDate"
                type="date"
                onChange={handleDateChange}
                className="text-2xl peer placeholder-transparent h-10 w-96 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="개업일"
              />
              <label
                htmlFor="startDate"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                개업일
              </label>
            </div>
            {errors.startDate && errors.startDate.type === 'required' && (
              <p className={style['error-text']}>개업일을 입력해주세요</p>
            )}
            <div className="relative my-5 border-b-2 border-bgcolor w-96 flex">
              <div className="w-80 overflow-hidden">
                <input
                  {...register('businessPermission', {
                    required: true,
                    pattern: /^[0-9]{11}$/,
                    validate: businessPermissionValidate,
                  })}
                  autoComplete="off"
                  id="businessPermission"
                  type="text"
                  className="text-2xl peer placeholder-transparent h-10 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                  placeholder="인허가 업소 정보"
                />
                <label
                  htmlFor="businessPermission"
                  className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
                >
                  인허가 업소 정보
                </label>
              </div>
              <button type="button" className={`${style['check-button']}`}>
                확인하기
              </button>
            </div>
            {errors.businessPermission &&
              errors.businessPermission.type === 'required' && (
                <p className={style['error-text']}>
                  인허가 업소 정보를 입력해주세요
                </p>
              )}
            {errors.businessPermission &&
              errors.businessPermission.type === 'pattern' && (
                <p className={style['error-text']}>
                  인허가 업소 정보를 올바르게 입력해주세요
                </p>
              )}
            {errors.businessPermission &&
              errors.businessPermission.type === 'validate' && (
                <p className={style['error-text']}>
                  인허가 업소 정보를 확인해주세요
                </p>
              )}
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('phone', {
                  required: true,
                  pattern: /^[0-9]$/,
                })}
                autoComplete="off"
                id="phone"
                type="phone"
                className="text-2xl peer placeholder-transparent h-10 w-96 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="연락처"
              />
              <label
                htmlFor="phone"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                연락처
              </label>
            </div>
            {errors.phone && errors.phone.type === 'required' && (
              <p className={style['error-text']}>연락처를 입력해주세요</p>
            )}
            {errors.phone && errors.phone.type === 'pattern' && (
              <p className={style['error-text']}>제대로 입력해주세요</p>
            )}

            <div className="relative my-5 border-b-2 border-bgcolor flex w-96">
              <div className="flex-1">
                <input
                  {...register('pickUpStartTime', {
                    required: true,
                  })}
                  autoComplete="off"
                  id="pickUpStartTime"
                  type="time"
                  className="text-2xl peer placeholder-transparent h-10 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                  placeholder="OPEN"
                />
                <label
                  htmlFor="pickUpStartTime"
                  className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
                >
                  OPEN
                </label>
              </div>
              <div className="flex-1">
                <input
                  {...register('pickUpEndTime', {
                    required: true,
                  })}
                  autoComplete="off"
                  id="pickUpEndTime"
                  type="time"
                  className="text-2xl peer placeholder-transparent h-10 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                  placeholder="Close"
                />
                <label
                  htmlFor="pickUpEndTime"
                  className="text-base absolute left-48 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
                >
                  CLOSE
                </label>
              </div>
            </div>
            {errors.pickUpStartTime &&
              errors.pickUpStartTime.type === 'required' && (
                <p className={style['error-text']}>OPEN 시간을 입력해주세요</p>
              )}
            {errors.pickUpEndTime &&
              errors.pickUpEndTime.type === 'required' && (
                <p className={style['error-text']}>CLOSE 시간을 입력해주세요</p>
              )}
            <div className="relative my-5 flex flex-col w-96">
              <p className="text-2xl text-bgcolor">알레르기 재료</p>
              <div>
                {allergyList.map((allergy, index) => {
                  return (
                    <AllergyButton
                      value={allergy.id}
                      key={allergy.id}
                      text={allergy.name}
                      onClick={handleAllergyBtnClick}
                      selected={allergyIdList.includes(allergy.id)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="relative my-5 flex flex-col w-96">
              <p className="text-2xl text-bgcolor">가게이미지</p>
              <input
                {...register('images', {
                  required: true,
                })}
                type="file"
                accept="image/*"
                multiple
              />
              {errors.images && errors.images.type === 'required' && (
                <p className={style['error-text']}>이미지를 선택해주세요</p>
              )}
            </div>
            <button
              type="submit"
              className="text-secondary bg-bgcolor text-4xl h-20 w-44 rounded-full mt-10"
            >
              <p>등록하기</p>
            </button>
          </div>
        </form>
      </Container.MainBody>
    </Container>
  );
};

export default Join;