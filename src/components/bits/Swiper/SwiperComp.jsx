import {
    A11y,
    Autoplay,
    Scrollbar,
    Navigation,
    Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { isDev, useIsMounted } from "@utils/index";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const CustomSwiper = ({
    slides,
    onSwiper,
    delay = 2500,
    onSlideChange,
    spaceBetween = 50,
    slidesPerView = 3,
    autoplay = false,
    scrollbar = false,
    pagination = false,
    navigation = false,
    ...rest
}) => {
    const isMounted = useIsMounted();
    if (!isMounted) return null;

    const handleOnSwiper = (swiper) => {
        if (isDev) console.log({ swiper });
        if (onSwiper) onSwiper(swiper);
    };

    const handleOnSlideChange = (swiper) => {
        if (isDev) console.log({ swiper });
        if (onSlideChange) onSlideChange(swiper);
    };

    return (
        <Swiper
            onSwiper={handleOnSwiper}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onSlideChange={handleOnSlideChange}
            navigation={navigation || undefined}
            scrollbar={scrollbar ? { draggable: true } : undefined}
            pagination={pagination ? { clickable: true } : undefined}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={
                autoplay ? { delay, disableOnInteraction: false } : undefined
            }
            {...rest}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>{slide}</SwiperSlide>
            ))}
        </Swiper>
    );
};
