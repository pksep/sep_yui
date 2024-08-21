<template>
  <div class="table-wrapper-yui-kit">
    <table class="table-yui-kit">
      <tr class="table-yui-kit__tr">
        <th class="table-yui-kit__th">№</th>
        <th class="table-yui-kit__th">Заказ</th>
        <th class="table-yui-kit__th">Артикул изделия</th>
        <th class="table-yui-kit__th">Наименование изделия</th>
        <th class="table-yui-kit__th">Комплектация/особенности заказа</th>
        <th class="table-yui-kit__th">Кол-во, шт.</th>
        <th class="table-yui-kit__th">Кол-во, дней</th>
        <th class="table-yui-kit__th">Осталось дней</th>
        <th class="table-yui-kit__th">Основание</th>
        <th class="table-yui-kit__th">Покупатель</th>
        <th class="table-yui-kit__th">Ур. комплектации</th>
        <th class="table-yui-kit__th">Комплектация по остаткам</th>
        <th class="table-yui-kit__th">Готовность к отгрузке в %</th>
        <th class="table-yui-kit__th">Статус</th>
        <th class="table-yui-kit__th">Дата План. отгрузки</th>
        <th class="table-yui-kit__th">Дата Факт. отгрузки</th>
        <th class="table-yui-kit__th">Примечание</th>
      </tr>
      <tr class="table-yui-kit__tr">
        <td class="table-yui-kit__td">1</td>
        <td class="table-yui-kit__td">№ 24-1831 /0 18.03.2024</td>
        <td class="table-yui-kit__td">Нет Изделия</td>
        <td class="table-yui-kit__td">Нет Изделия</td>
        <td class="table-yui-kit__td">Нет комплектации</td>
        <td class="table-yui-kit__td">1</td>
        <td class="table-yui-kit__td">12</td>
        <td class="table-yui-kit__td">
          Счет на оплату № 268 от 18 октября 2023 г..pdf
        </td>
        <td class="table-yui-kit__td">нет</td>
        <td class="table-yui-kit__td">0%</td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
        <td class="table-yui-kit__td">Просрочено</td>
        <td class="table-yui-kit__td">28.02.2024</td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
        <td class="table-yui-kit__td"></td>
        <td class="table-yui-kit__td"></td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
      </tr>
      <tr class="table-yui-kit__tr">
        <td class="table-yui-kit__td">2</td>
        <td class="table-yui-kit__td">№ 24-1831 /0 18.03.2024</td>
        <td class="table-yui-kit__td">Нет Изделия</td>
        <td class="table-yui-kit__td">Нет Изделия</td>
        <td class="table-yui-kit__td">Нет комплектации</td>
        <td class="table-yui-kit__td">1</td>
        <td class="table-yui-kit__td">12</td>
        <td class="table-yui-kit__td">
          Счет на оплату № 268 от 18 октября 2023 г..pdf
        </td>
        <td class="table-yui-kit__td">ООО «ТехМашСнаб» (Белгород)</td>
        <td class="table-yui-kit__td">0%</td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
        <td class="table-yui-kit__td">Просрочено</td>
        <td class="table-yui-kit__td">28.02.2024</td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
        <td class="table-yui-kit__td">04.05.1970</td>
        <td class="table-yui-kit__td"></td>
        <td class="table-yui-kit__td">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABIAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD64/aA+N3xo0n48+NtK0r4veKLa1tvF2pRW1tb6/cpHFGt1IFRVD4VQAAAOABXI/8AC/vjv/0Wvxd/4Ul1/wDHKm/aQ/5OI8e/9jpqn/pXLXF0Add/wv747/8ARa/F3/hSXX/xyj/hf3x3/wCi1+Lv/Ckuv/jlcjRQB+yvh+WSbQbKaaRnd7SNmZjkklRkk96/J3UPj58dUv50T40+LQBMwAHiO6wBk/8ATSv1g8N/8i7Yf9eUX/oAr8c9S/5CNx/13f8AmaAOn/4X98d/+i1+Lv8AwpLr/wCOUf8AC/vjv/0Wvxd/4Ul1/wDHK5GigDrv+F/fHf8A6LX4u/8ACkuv/jlFcjRQB2n7SH/JxHj3/sdNU/8ASuWuLrtP2kP+TiPHv/Y6ap/6Vy1xdABRRRQB+yfhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM1+xnhv8A5F2w/wCvKL/0AV+Oepf8hG4/67v/ADNAEFFFFABRRRQB+zTafYOxd7KEknJJjGSaP7N07/nwh/79D/CvyZ/aQ/5OI8e/9jpqn/pXLXF0Afs1/Zunf8+EP/fof4Uf2bp3/PhD/wB+h/hX4y0UAftAAFAVRgDoBUP9m6d/z4Q/9+h/hUHhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0Afsn/Zunf8APhD/AN+h/hR/Zunf8+EP/fof4V+MtFAH7Nf2bp3/AD4Q/wDfof4UV+MtFAHaftIf8nEePf8AsdNU/wDSuWuLrtP2kP8Ak4jx7/2Omqf+lctcXQAUUUUAfsn4b/5F2w/68ov/AEAV+Oepf8hG4/67v/M1+xnhv/kXbD/ryi/9AFfjnqX/ACEbj/ru/wDM0AQUUUUAFFFFAHaftIf8nEePf+x01T/0rlri6KKACiiigD9k/Df/ACLth/15Rf8AoAr8c9S/5CNx/wBd3/maKKAIKKKKACiiigD/2Q=="
            class="link_img"
            atl="Показать"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper-yui-kit {
  overflow-x: scroll;
  width: 100%;
  padding-bottom: 15px;
}
.table-yui-kit {
  overflow: hidden;
  border-radius: 15px;
}
</style>
