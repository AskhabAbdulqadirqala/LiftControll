# LiftConstroll
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/Demonstation.gif)

LiftConstroll - веб-приложение, представляющее из себя систему управления лифтовой инфраструктуры населённого пункта. Оно реализовано на React.JS (frontend), Node.JS (backend) и MondoDB (база данных).
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/main_page.png)
Главная страница веб-приложения представляет из себя 4 кнопки, которые переадресовывают оператора системы управления на разные функциональные компоненты.

## NewReq
Компонент создания запроса. Первый компонент позволяет оператору при звонке от пользователя лифта с жалобой о неисправности в лифтовой инфраструктуре в режиме реального времени на основе данных от пользователя сформировать новый запрос на исправление неисправности.
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/new_req.png)

## AutoReq
Компонент модерации автоматических запросов.
Второй компонент позволяет оператору системы управления модерировать список из автоматических срабатываний датчиков неисправностей в лифтовой инфраструктуре. Данные о неисправностях отображаются в виде списка и оператор имеет возможность отобрать заявку, нажав кнопку «принять», или, в случае незначительности заявки, отклонить её, нажав на кнопку «отклонить».
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/auto_req.png)
## Distribution
Компонент распределения заявок.
Третий компонент даёт возможность распределять между центрами обслуживания лифтов отмодерированные заявки на исправление неисправностей в лифтовой инфраструктуре населённого пункта. Для удобства распределения заявок в компоненте использована Яндекс-Карта, на которой отображены все заявки (отмечены красным цветом) и центры обслуживания (отмечены голубым цветом).  После интерактивной карты оператор видит список из заявок. Для распределения заявки после информации о заявке предусмотрена графа «Отправить подразделению:» со списком номеров центров обслуживания. Кнопки с номерами центров обслуживания окрашены в разные цвета (зелёный и красный) в зависимости от их загруженности.
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/distribution.png)

## FixedReq
Компонент закрытия заявок.
Четвёртый нужен для закрытия заказов, которые уже были отмодерированы и распределены по центрам обслуживания. В компоненте отображён список из заявок. После информации о заявке указана графа «Отчёт мастерской» для ввода отчета центра обслуживания о закрытии заявки, где указываются детали проведённых работ по обслуживанию лифтовой инфраструктуры. сле заполнения текстового элемента оператор системы управления нажимает кнопку «Закрыть заявку».
![image](https://github.com/AskhabAbdulqadirqala/LiftConstroll/public/demonstration/fixed_req.png)