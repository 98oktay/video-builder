
# Video Oluşturma Yapısı

Bu proje, React kullanarak video oluşturmayı kolaylaştıran bir yapı sunar. Aşağıdaki adımları izleyerek bu yapıyı kullanabilirsiniz.

## Adım 1: Gerekli Kurulumlar

Bu projeyi kullanabilmek için öncelikle bilgisayarınızda `ffmpeg` kurulu olmalıdır. Bu kurulumunuzu tamamladıktan sonra, projeyi bir klasöre indirin veya bir proje oluşturun. Sonrasında gerekli paketleri kurun.
`yarn install` 

## Adım 2: Yapıyı İçe Aktarma

Video oluşturma yapısını kullanabilmek için bu proje içinde bulunan `Composition.jsx` içeriğini düzenlemeniz gerekmektedir. 

## Adım 3: Composition Component'ini Kullanma

Video oluşturma işlemini gerçekleştirmek için `Composition` adlı bir bileşeni kullanmanız gerekmektedir. Bu bileşeni, projenizin ilgili dosyasında import edin ve projenizin içerisinde kullanın.

Örnek kullanım:

jsxCopy code

```

import React from "react";
import { Creator, Scene, Transition } from "./lib";

function Composition() {
  return (
    <Creator name="video1">
      <Scene color="#cecece" duration={5}>
        {/* Sahne içeriği */}
      </Scene>
      <Transition effect="TricolorCircle" duration={3} />
      <Scene color="orange" outline preview>
        {/* Sahne içeriği */}
      </Scene>
    </Creator>
  );
}

export default Composition;
``` 

Yukarıdaki örnekte, `Composition` bileşeni, video oluşturma yapısını kullanmaktadır. İçerisinde `<Scene>`, `<Transition>`, `<Text>`, `<Image>` ve `<Group>` bileşenleri kullanılarak sahneler oluşturulmaktadır.

## Adım 4: Yapılandırma

Video oluşturma yapısı, bileşenlerin prop'larını kullanarak yapılandırılabilir. Örnekte verilen bileşenlerin bazı prop'ları aşağıdaki gibidir:

-   `<Scene>` bileşeni:
    
    -   `color`: Sahne arka plan rengini belirler.
    -   `duration`: Sahnenin süresini belirler.
    -   `preview`: Sadece bu sahnenin animasyonsuz halini 1 saniyelik önizlenmesini sağlar.
    -   `outline`: Sahne içindeki bileşenleri vurgular. 

-   `<Transition>` bileşeni:
    
    -   `effect`: Geçiş efektini belirler.
    -   `duration`: Geçiş süresini belirler.
-   `<Text>` bileşeni:
    
    -   `x`: Yatay konumunu belirler.
    -   `y`: Dikey konumunu belirler.
    -   `width`: Genişliğini belirler.
    -   `in`: Giriş animasyonunu yapılandırır.
    -   `out`: Çıkış animasyonunu yapılandırır.
-   `<Video>` bileşeni:

    -   `src`: Video dosyasının yolunu belirler.
    -   `x`: Yatay konumunu belirler.
    -   `y`: Dikey konumunu belirler.
    -   `width`: Genişliğini belirler.
    -   `in`: Giriş animasyonunu yapılandırır.
    -   `out`: Çıkış animasyonunu yapılandırır.
-   `<Image>` bileşeni:
    
    -   `src`: Görüntünün kaynak dosyasının yolunu belirler.
    -   `url`: Görüntünün kaynak dosyasının URL'ini belirler.
    -   `border`: Görüntünün kenarlığını belirler.
    -   `radius`: Görüntünün köşelerinin yuvarlaklığını belirler.
    -   `scale`: Görüntünün boyutunu belirler.
    -   `relative`: Görüntünün göreceli konumunu belirler.
    -   `x`: Yatay konumunu belirler.
    -   `y`: Dikey konumunu belirler.
    -   `width`: Genişliğini belirler.
    -   `in`: Giriş animasyonunu yapılandırır.
    -   `out`: Giriş animasyonunu yapılandırır.
    -   `animation`: Görüntüye özel animasyonları yapılandırır.
    -   `aspectRatio`: Görüntünün en boy oranını belirler.

-   `<Group>` bileşeni:
    
    -   `x`: Yatay konumunu belirler.
    -   `y`: Dikey konumunu belirler.
    -   `width`: Genişliğini belirler.
    -   `height`: Yüksekliğini belirler.
    -   `in`: Giriş animasyonunu yapılandırır.
    -   `out`: Çıkış animasyonunu yapılandırır.
    -   `list`: Grup içindeki bileşenlerin sıralamasını belirler.
    -   `itemHeight`: Grup içindeki bileşenlerin yüksekliğini belirler.
    -   `itemWidth`: Grup içindeki bileşenlerin genişliğini belirler.
    -   `itemSpacing`: Grup içindeki bileşenlerin arasındaki boşluğu belirler.

    `<Box>` bileşeni:
    -  `x`: Yatay konumunu belirler.
    -  `y`: Dikey konumunu belirler.
    -  `width`: Genişliğini belirler.
    -  `height`: Yüksekliğini belirler.
    -  `in`: Giriş animasyonunu yapılandırır.
    -  `out`: Çıkış animasyonunu yapılandırır.
    -  `color`: Kutunun arka plan rengini belirler.
    -  `border`: (width, color) Kutunun kenarlık rengini belirler.

    `<Line>` bileşeni:
    -  `x`: Başlangıç x konumunu belirler.
    -  `y`: Başlangıç y konumunu belirler.
    -  `x2`: Bitiş x konumunu belirler.
    -  `y2`: Bitiş y konumunu belirler.
    -  `border`: Çizginin kalınlığını belirler.
    -  `color`: Çizginin rengini belirler.

    `<Audio>` bileşeni:
    -  `src`: Ses dosyasının yolunu belirler.
    -  `volume`: Sesin yüksekliğini belirler.
    -  `loop`: Sesin tekrarlanıp tekrarlanmayacağını belirler.
    -  `muted`: Sesin kapatılıp kapatılmayacağını belirler.
    -  `startTime`: Sesin başlangıç zamanını belirler.
    -  `fadeIn`: Sesin bitiş zamanını belirler.
    -  `fadeOut`: Sesin bitiş zamanını belirler.
    

Bu bileşenlere ek olarak, `<Creator>` bileşeni de kullanılmaktadır. Bu bileşen, oluşturulan videoyu adlandırmak için bir `name` prop'u alır.

## Adım 5: Video Oluşturma

Video oluşturma yapısını kullandıktan sonra, oluşturulan videoyu elde etmek için gerekli işlemleri gerçekleştirebilirsiniz. Bunu yapmak için, oluşturduğunuz projeyi derleyin ve çalıştırın. 
`yarn start` 
Sonuç olarak, video oluşturma yapısının içerdiği sahneler ve efektler kullanılarak oluşturulan bir video dosyası üretilecektir.

Bu, video oluşturma yapısını kullanmanın temel adımlarını içeren bir örnektir. İhtiyaçlarınıza göre bileşenleri ve prop'larını yapılandırarak, özelleştirilmiş videolar oluşturabilirsiniz. Daha fazla bilgi için, ilgili bileşenlerin ve prop'ların dokümantasyonunu inceleyebilirsiniz.
