/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import AllergyButton from '@/components/AllergyButton';
import Container from '@/components/Container';
import useMember from '@/hooks/memberHook';
import { getMember } from '@/utils/api/member';
import { getAllergy, getStoreType } from '@/utils/api/store';
import clientHttp, { clientHttpForm } from '@/utils/clientHttp';

const Join = () => {
  const router = useRouter();
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

  const [allergyList, setAllergyList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [clicked, setClicked] = useState(false);

  const { memberAttributes, login, setMemberId } = useMember();

  useEffect(() => {
    getAllergy().then(data => setAllergyList(data));
    getStoreType().then(data => setStoreTypeList(data));
  }, []);

  const handleFileChange = event => {
    setSelectedFiles(event.target.files);
  };

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
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const loadDaumPostcodeScript = () => {
      const script = document.createElement('script');
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    if (!window.daum || !window.daum.Postcode) {
      loadDaumPostcodeScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  const onSubmit = async data => {
    setClicked(true);
    const result = {
      ...data,
      memberId: memberAttributes.memberId,
      detailAddress,
      allergyIdList,
      lat,
      lng,
    };
    // console.log(result);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file, index) => {
      formData.append(`images`, file);
    });

    /* for (const [key, value] of formData.entries()) {
      console.log(key, value);
    } */
    // setClicked(false);
    formData.append('data', JSON.stringify(result));
    try {
      const response = await clientHttpForm.post('/store', formData);
      // console.log(response.data);
      if (response.data.success) {
        const memberData = await getMember();
        if (memberData.isJoined) {
          login(memberData);
          router.push('/business');
        }
      } else {
        router.push('/');
      }
      return response.data;
    } catch (error) {
      // console.log(error);
      throw new Error('File upload failed');
    }
  };

  const handleSubmitButtonClick = () => {
    setClickCount(clickCount + 1);
    handleSubmit(onSubmit);
  };

  // 좌표를 가져오는 함수
  const getGeocode = async query => {
    const API_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

    try {
      const response = await axios.get(API_URL, {
        params: { query },
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADDRESS_API_KEY}`,
        },
      });
      setLng(response.data.documents[0].address.x);
      setLat(response.data.documents[0].address.y);
    } catch (error) {
      console.error('Failed to search address:', error);
    }
  };
  const handleAddressAPI = () => {
    if (!isLoaded) return;

    new window.daum.Postcode({
      oncomplete: async data => {
        const {
          zonecode,
          roadAddress,
          jibunAddress,
          bname,
          buildingName,
          apartment,
        } = data;
        const userSelectedType = data.userSelectedType;

        const addr = userSelectedType === 'R' ? roadAddress : jibunAddress;

        let extraAddr = '';
        if (userSelectedType === 'R') {
          if (bname !== '' && /[동|로|가]$/g.test(bname)) {
            extraAddr += bname;
          }
          if (buildingName !== '' && apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + buildingName : buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        setPostcode(zonecode);
        setAddress(addr);
        setExtraAddress(extraAddr);
        await getGeocode(addr);
      },
    }).open();
  };

  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary">
        <form className="max-w-sm">
          <div className="text-bgcolor text-center mb-24">
            <h1 className="text-7xl mt-20 mb-6 tablet:text-3xl tablet:font-bold">
              RESISTE YOUR STORE
            </h1>
            <h3 className="text-4xl font-thin tablet:text-xl">
              남은 음식을 수익으로 바꿔봐요
            </h3>
          </div>
          <div className="flex flex-col items-center ">
            <div className="relative my-5 border-b-2 border-bgcolor w-full">
              <input
                {...register('name', {
                  required: true,
                })}
                autoComplete="off"
                id="name"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-full bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
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
            <div className="relative my-5 border-b-2 border-bgcolor w-full flex justify-between">
              <div>
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
            <button type="button" className={`${style['check-button']}`}>
              확인하기
            </button>
            <div className="relative my-5 border-b-2 border-bgcolor w-full">
              <input
                {...register('ownerName', {
                  required: true,
                  pattern: /^[가-힣]{2,10}$/,
                })}
                autoComplete="off"
                id="ownerName"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-full bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
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
            <div className="relative my-5 border-b-2 border-bgcolor w-full">
              <input
                {...register('startDate', {
                  required: true,
                })}
                autoComplete="off"
                id="startDate"
                type="date"
                onChange={handleDateChange}
                className="text-2xl peer placeholder-transparent h-10 w-full bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
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
            <div className="relative my-5 border-b-2 border-bgcolor w-full flex justify-between">
              <div className="w-80 overflow-hidden">
                <input
                  {...register('businessPermission', {
                    required: true,
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
            <button type="button" className={`${style['check-button']}`}>
              확인하기
            </button>
            <div className="relative my-5 flex flex-col w-full">
              <p className="text-2xl text-bgcolor">업종</p>
              <select
                {...register('typeId', {
                  required: true,
                })}
                type="text"
              >
                <option value="">업종을 선택해주세요</option>
                {storeTypeList.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.typeId && errors.typeId.type === 'required' && (
                <p className={style['error-text']}>업종을 선택해주세요</p>
              )}
            </div>
            <div className="relative my-5 flex flex-col w-full">
              <p className="text-2xl text-bgcolor">주소</p>
              <div className="flex justify-between">
                <input
                  type="text"
                  readOnly
                  value={postcode}
                  placeholder="우편번호"
                  className="text-2xl h-10 w-32 bg-secondary text-secondaryfont focus:outline-none placeholder-secondaryfont"
                />
                <button
                  type="button"
                  onClick={handleAddressAPI}
                  className={`${style['check-button']}`}
                >
                  우편번호 찾기
                </button>
              </div>
              <br />
              <input
                {...register('address', {
                  required: true,
                })}
                type="text"
                readOnly
                value={address}
                placeholder="주소"
                className="text-2xl h-10 bg-secondary text-secondaryfont focus:outline-none placeholder-secondaryfont"
              />
              <br />
              <input
                {...register('detailAddress', {
                  required: true,
                })}
                type="text"
                value={detailAddress}
                onChange={e => setDetailAddress(e.target.value)}
                placeholder="상세주소를 입력해주세요"
                className="text-2xl h-10 bg-secondary text-bgcolor focus:outline-none placeholder-bgcolor border-b-2 border-bgcolor"
              />
              <input
                type="text"
                readOnly
                value={extraAddress}
                placeholder="참고항목"
                className="text-2xl h-10 bg-secondary text-secondaryfont focus:outline-none placeholder-secondaryfont"
              />
            </div>
            <div className="relative my-5 border-b-2 border-bgcolor w-full">
              <input
                {...register('phone', {
                  required: true,
                  pattern: /^[0-9]{11}$/,
                })}
                autoComplete="off"
                id="phone"
                type="phone"
                className="text-2xl peer placeholder-transparent h-10 w-full bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
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

            <div className="relative my-5 border-b-2 border-bgcolor flex w-full justify-between">
              <div>
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
              <div>
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
                  className="text-base absolute right-24 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
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
            <div className="relative my-5 flex flex-col w-full">
              <p className="text-2xl text-bgcolor">알레르기 재료</p>
              <div>
                {allergyList.map((allergy, index) => {
                  return (
                    <AllergyButton
                      value={allergy.id}
                      key={allergy.id}
                      text={allergy.name}
                      onClick={handleAllergyBtnClick}
                      selected={allergyIdList.includes(allergy.id.toString())}
                    />
                  );
                })}
              </div>
            </div>
            <div className="relative my-5 flex flex-col w-full">
              <p className="text-2xl text-bgcolor">가게이미지</p>
              <input
                {...register('images', {
                  required: true,
                })}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {errors.images && errors.images.type === 'required' && (
                <p className={style['error-text']}>이미지를 선택해주세요</p>
              )}
            </div>
            <button
              type="submit"
              className="text-secondary bg-bgcolor text-4xl h-20 w-44 rounded-full mt-10"
              onClick={handleSubmit(onSubmit)}
              // disabled={clicked}
            >
              <p>등록하기</p>
            </button>
            {/* <div>전송시작?{clicked ? <p>네</p> : <p>아니오</p>}</div> */}
          </div>
        </form>
      </Container.MainBody>
    </Container>
  );
};

export default Join;
