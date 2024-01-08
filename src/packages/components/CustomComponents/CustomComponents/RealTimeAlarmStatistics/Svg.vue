<template>
  <div class="box">
    <img class="scaner" src="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" alt="">
    <svg v-show="alarmLevels.length === 5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <g>
        <g>
          <circle style="opacity:0.2;fill-rule:evenodd;clip-rule:evenodd;fill:#4196FF;" cx="100" cy="100" r="100" />
        </g>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;fill-opacity:0.6;" cx="100" cy="100" r="92" />
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <radialGradient id="real_time_alarm_statistics_5_1_" cx="100" cy="100" r="92" gradientUnits="userSpaceOnUse">
            <stop offset="0.836" style="stop-color:#FFFFFF;stop-opacity:0.05" />
            <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          </radialGradient>
          <path style="fill:url(#real_time_alarm_statistics_5_1_);" d="M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#091C38;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <g style="opacity:0.5;">
            <path style="fill:#FFFFFF;" d="M100,11c49.074,0,89,39.925,89,89c0,49.075-39.926,89-89,89c-49.075,0-89-39.925-89-89C11,50.925,50.925,11,100,11 M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
          </g>
        </g>
        <radialGradient id="real_time_alarm_statistics_5_2_" cx="100" cy="100" r="72.8008" gradientUnits="userSpaceOnUse">
          <stop offset="0.9032" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.05" />
        </radialGradient>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:url(#real_time_alarm_statistics_5_2_);fill-opacity:0.6;" cx="100" cy="100" r="72.801" />
        <path style="fill:#091C38;" d="M100,27.6c-39.984,0-72.4,32.413-72.4,72.4s32.416,72.4,72.4,72.4c39.986,0,72.4-32.413,72.4-72.4S139.986,27.6,100,27.6L100,27.6z" />
        <g style="opacity:0.2;">
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="29.6" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.778" y2="32" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.801" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="50.219" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="64.801" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="81.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="29.6" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="149.781" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.803" y2="160.968" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.779" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="170.399" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="160.967" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="149.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.968" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="170.4" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="81.777" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.967" y2="64.798" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="50.218" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="32" />
        </g>
        <path style="opacity:0.1;fill:#4196FF;" d="M100,96.434c1.969,0,3.568,1.598,3.568,3.566s-1.6,3.566-3.568,3.566s-3.568-1.598-3.568-3.566S98.031,96.434,100,96.434 M100,95.633c-2.412,0-4.369,1.955-4.369,4.367s1.957,4.367,4.369,4.367s4.367-1.955,4.367-4.367S102.412,95.633,100,95.633L100,95.633z" />
        <path style="opacity:0.12;fill:#4196FF;" d="M100,88.18c6.52,0,11.822,5.301,11.822,11.82S106.52,111.82,100,111.82S88.176,106.52,88.176,100S93.48,88.18,100,88.18 M100,87.379c-6.972,0-12.621,5.65-12.621,12.621s5.649,12.621,12.621,12.621s12.621-5.65,12.621-12.621S106.972,87.379,100,87.379L100,87.379z" />
        <path style="opacity:0.14;fill:#4196FF;" d="M100,79.924c11.071,0,20.077,9.006,20.077,20.076s-9.006,20.076-20.077,20.076S79.923,111.07,79.923,100S88.929,79.924,100,79.924 M100,79.123c-11.531,0-20.877,9.347-20.877,20.877s9.346,20.876,20.877,20.876c11.529,0,20.877-9.346,20.877-20.876S111.529,79.123,100,79.123L100,79.123z" />
        <path style="opacity:0.16;fill:#4196FF;" d="M100,71.67c15.623,0,28.33,12.708,28.33,28.33s-12.707,28.33-28.33,28.33S71.67,115.622,71.67,100S84.377,71.67,100,71.67 M100,70.869c-16.09,0-29.131,13.045-29.131,29.131S83.91,129.131,100,129.131s29.131-13.045,29.131-29.131S116.09,70.869,100,70.869L100,70.869z" />
        <path style="opacity:0.18;fill:#4196FF;" d="M100,63.416c20.173,0,36.584,16.412,36.584,36.584c0,20.173-16.411,36.584-36.584,36.584c-20.174,0-36.584-16.411-36.584-36.584C63.416,79.828,79.826,63.416,100,63.416M100,62.615c-20.646,0-37.385,16.738-37.385,37.385c0,20.646,16.738,37.385,37.385,37.385s37.385-16.739,37.385-37.385C137.385,79.354,120.646,62.615,100,62.615L100,62.615z" />
        <path style="opacity:0.2;fill:#4196FF;" d="M100,55.163c24.724,0,44.84,20.112,44.84,44.837s-20.116,44.837-44.84,44.837c-24.725,0-44.84-20.112-44.84-44.837S75.275,55.163,100,55.163 M100,54.363c-25.205,0-45.641,20.432-45.641,45.637S74.795,145.637,100,145.637s45.637-20.432,45.637-45.637S125.205,54.363,100,54.363L100,54.363z" />
        <path style="opacity:0.22;fill:#4196FF;" d="M100,46.906c29.275,0,53.092,23.818,53.092,53.094S129.275,153.094,100,153.094S46.906,129.275,46.906,100S70.725,46.906,100,46.906 M100,46.109c-29.765,0-53.891,24.127-53.891,53.891c0,29.763,24.126,53.891,53.891,53.891s53.891-24.128,53.891-53.891C153.891,70.236,129.765,46.109,100,46.109L100,46.109z" />
        <path style="opacity:0.24;fill:#4196FF;" d="M100,38.654c33.826,0,61.346,27.52,61.346,61.346s-27.52,61.346-61.346,61.346S38.654,133.826,38.654,100S66.174,38.654,100,38.654 M100,37.854c-34.322,0-62.146,27.823-62.146,62.146c0,34.32,27.824,62.146,62.146,62.146S162.146,134.32,162.146,100C162.146,65.677,134.322,37.854,100,37.854L100,37.854z" />
        <path style="opacity:0.26;fill:#4196FF;" d="M100,30.4c38.378,0,69.6,31.222,69.6,69.6s-31.222,69.6-69.6,69.6S30.4,138.378,30.4,100S61.622,30.4,100,30.4 M100,29.6c-38.881,0-70.4,31.521-70.4,70.4c0,38.879,31.52,70.4,70.4,70.4c38.883,0,70.4-31.521,70.4-70.4C170.4,61.12,138.883,29.6,100,29.6L100,29.6z" />
        <circle style="opacity:0;fill:#F43B42;" cx="100" cy="100" r="0.471" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" d="M31.521,77.75C40.896,48.877,68.004,28,100,28c0-6.904,0-13.677,0-20C59.114,8,24.465,34.673,12.486,71.564L31.521,77.75z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" d="M28,100c0-7.768,1.245-15.241,3.521-22.25l-19.034-6.186C9.578,80.521,8,90.075,8,100c0,30.6,14.942,57.704,37.924,74.43l11.762-16.189C39.7,145.15,28,123.947,28,100z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;" d="M154.076,174.43l-11.762-16.189C130.434,166.887,115.817,172,100,172c-15.818,0-30.435-5.113-42.314-13.76L45.924,174.43C61.104,185.478,79.789,192,100,192S138.896,185.478,154.076,174.43z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#14C6BD;" d="M100,28c31.999,0,59.104,20.879,68.479,49.75l19.035-6.185C175.535,34.673,140.886,8,100,8C100,14.323,100,21.096,100,28z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#4FBADB;" d="M187.514,71.565l-19.035,6.185C170.755,84.759,172,92.232,172,100c0,23.948-11.701,45.15-29.686,58.24l11.762,16.189C177.058,157.704,192,130.6,192,100C192,90.075,190.422,80.521,187.514,71.565z" />
        <g>
          <text transform="matrix(0.809 0.5878 -0.5878 0.809 135.6914 29.3159)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ eventName }}</text>
        </g>
        <g>
          <text transform="matrix(0.309 -0.9511 0.9511 0.309 176.5986 139.2744)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ commonName }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 86.3184 184.9395)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ importantName }}</text>
        </g>
        <g>
          <text transform="matrix(0.309 0.9511 -0.9511 0.309 16.4736 115.8477)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ seriousName }}</text>
        </g>
        <g>
          <text transform="matrix(0.809 -0.5878 0.5878 0.809 42.084 46.4502)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ urgentName }}</text>
        </g>
      </g>
  <!--    <image class="scaner" style="overflow:visible;" width="734" height="734" xlink:href="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" transform="matrix(0.192 0 0 0.192 29.5996 29.5996)" />-->
      <g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#4FBADB;fill-opacity:0.3;" d="M151,119.578c0,2.209-1.79,3.998-3.998,3.998c-2.211,0-4.002-1.789-4.002-3.998c0-2.211,1.791-4.002,4.002-4.002C149.21,115.576,151,117.367,151,119.578z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#4FBADB;fill-opacity:0.6;" cx="147" cy="119.578" r="2.399" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#4FBADB;" cx="147.002" cy="119.578" r="1.2" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#14C6BD;fill-opacity:0.3;" cx="132.799" cy="59.001" r="4" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#14C6BD;fill-opacity:0.6;" cx="132.799" cy="59.001" r="2.399" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#14C6BD;" cx="132.801" cy="59.001" r="1.2" />
        </g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.3;" d="M58,119.579c0,2.209-1.791,3.998-4.001,3.998c-2.208,0-3.999-1.789-3.999-3.998c0-2.211,1.791-4.002,3.999-4.002C56.209,115.577,58,117.368,58,119.579z" />
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.6;" d="M56.4,119.579c0,1.324-1.076,2.398-2.401,2.398c-1.323,0-2.401-1.074-2.401-2.398c0-1.326,1.078-2.4,2.401-2.4C55.324,117.179,56.4,118.253,56.4,119.579z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" cx="53.999" cy="119.579" r="1.2" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.3;" cx="68.801" cy="59.109" r="4" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.6;" cx="68.8" cy="59.109" r="2.401" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" cx="68.8" cy="59.109" r="1.2" />
        </g>
        <g>
          <text transform="matrix(1 0 0 1 63.8945 80)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["urgent"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 49.0938 109)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["serious"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 142.0957 109)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["important"] : 0 }}</text>
        </g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;fill-opacity:0.3;" d="M104,154.002c0,2.209-1.79,3.998-3.998,3.998c-2.211,0-4.002-1.789-4.002-3.998c0-2.211,1.791-4.002,4.002-4.002C102.21,150,104,151.791,104,154.002z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;fill-opacity:0.6;" cx="100" cy="154.002" r="2.399" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;" cx="100.002" cy="154.002" r="1.2" />
        </g>
        <g>
          <text transform="matrix(1 0 0 1 95.0957 143.4238)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["secondary"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 124.5898 78.2905)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["record"] : 0 }}</text>
        </g>
      </g>
    </svg>
    <svg v-show="alarmLevels.length === 4 || alarmLevels.length === 0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="real_time_alarm_statistics_35" cx="100" cy="660" r="92" gradientTransform="matrix(1, 0, 0, -1, 0, 760)" gradientUnits="userSpaceOnUse">
          <stop offset="0.84" stop-color="#fff" stop-opacity="0.05" />
          <stop offset="1" stop-color="#d0e3ea" stop-opacity="0.9" />
        </radialGradient>
        <radialGradient id="real_time_alarm_statistics_36" cx="100" cy="660" r="72.8" gradientTransform="matrix(1, 0, 0, -1, 0, 760)" gradientUnits="userSpaceOnUse">
          <stop offset="0.9" stop-color="#d0e3ea" stop-opacity="0.9" />
          <stop offset="1" stop-color="#d0e3ea" stop-opacity="0.05" />
        </radialGradient>
      </defs>
      <g>
        <circle cx="100" cy="100" r="100" style="fill:#4196ff;opacity:0.20000000298023224;isolation:isolate" />
        <circle cx="100" cy="100" r="92" style="fill:#d0e3ea;fill-opacity:0.6000000238418579" />
        <circle cx="100" cy="100" r="92" style="fill:#d0e3ea" />
        <circle cx="100" cy="100" r="92" style="fill:#d0e3ea" />
        <path d="M100,8a92,92,0,1,0,92,92A92,92,0,0,0,100,8Z" style="fill:url(#real_time_alarm_statistics_35)" />
        <circle cx="100" cy="100" r="92" style="fill:#091c38" />
        <g style="opacity:0.5">
          <path d="M100,11a89,89,0,1,1-89,89,89,89,0,0,1,89-89m0-3a92,92,0,1,0,92,92A92,92,0,0,0,100,8Z" style="fill:#fff" />
        </g>
        <circle cx="100" cy="100" r="72.8" style="fill-opacity:0.6000000238418579;fill:url(#real_time_alarm_statistics_36)" />
        <path d="M100,27.6A72.4,72.4,0,1,0,172.4,100,72.4,72.4,0,0,0,100,27.6Z" style="fill:#091c38" />
        <g style="opacity:0.20000000298023224">
          <line x1="100" y1="100" x2="100" y2="29.6" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="81.78" y2="32" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="64.8" y2="39.03" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="50.22" y2="50.22" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="39.03" y2="64.8" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="32" y2="81.78" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="29.6" y2="100" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="32" y2="118.22" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="39.03" y2="135.2" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="50.22" y2="149.78" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="64.8" y2="160.97" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="81.78" y2="168" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="100" y2="170.4" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="118.22" y2="168" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="135.2" y2="160.97" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="149.78" y2="149.78" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="160.97" y2="135.2" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="168" y2="118.22" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="170.4" y2="100" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="168" y2="81.78" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="160.97" y2="64.8" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="149.78" y2="50.22" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="135.2" y2="39.03" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
          <line x1="100" y1="100" x2="118.22" y2="32" style="fill:none;stroke:#4196ff;stroke-linecap:round;stroke-linejoin:round" />
        </g>
        <path d="M100,96.43A3.57,3.57,0,1,1,96.43,100h0A3.57,3.57,0,0,1,100,96.43m0-.8a4.37,4.37,0,1,0,4.37,4.37A4.37,4.37,0,0,0,100,95.63Z" style="fill:#4196ff;opacity:0.10000000149011612;isolation:isolate" />
        <path d="M100,88.18A11.82,11.82,0,1,1,88.18,100h0A11.83,11.83,0,0,1,100,88.18m0-.8A12.62,12.62,0,1,0,112.62,100,12.62,12.62,0,0,0,100,87.38Z" style="fill:#4196ff;opacity:0.11999999731779099;isolation:isolate" />
        <path d="M100,79.92A20.08,20.08,0,1,1,79.92,100h0A20.1,20.1,0,0,1,100,79.92m0-.8A20.88,20.88,0,1,0,120.88,100,20.88,20.88,0,0,0,100,79.12Z" style="fill:#4196ff;opacity:0.14000000059604645;isolation:isolate" />
        <path d="M100,71.67A28.33,28.33,0,1,1,71.67,100h0A28.36,28.36,0,0,1,100,71.67m0-.8A29.13,29.13,0,1,0,129.13,100,29.13,29.13,0,0,0,100,70.87Z" style="fill:#4196ff;opacity:0.1599999964237213;isolation:isolate" />
        <path d="M100,63.42A36.58,36.58,0,1,1,63.42,100h0A36.63,36.63,0,0,1,100,63.42m0-.8A37.38,37.38,0,1,0,137.38,100,37.38,37.38,0,0,0,100,62.62Z" style="fill:#4196ff;opacity:0.18000000715255737;isolation:isolate" />
        <path d="M100,55.16A44.84,44.84,0,1,1,55.16,100h0A44.89,44.89,0,0,1,100,55.16m0-.8A45.64,45.64,0,1,0,145.64,100,45.64,45.64,0,0,0,100,54.36Z" style="fill:#4196ff;opacity:0.20000000298023224;isolation:isolate" />
        <path d="M100,46.91A53.09,53.09,0,1,1,46.91,100h0A53.15,53.15,0,0,1,100,46.91m0-.8A53.89,53.89,0,1,0,153.89,100,53.89,53.89,0,0,0,100,46.11Z" style="fill:#4196ff;opacity:0.2199999988079071;isolation:isolate" />
        <path d="M100,38.65A61.35,61.35,0,1,1,38.65,100h0A61.42,61.42,0,0,1,100,38.65m0-.8A62.15,62.15,0,1,0,162.15,100,62.15,62.15,0,0,0,100,37.85h0Z" style="fill:#4196ff;opacity:0.23999999463558197;isolation:isolate" />
        <path d="M100,30.4A69.6,69.6,0,1,1,30.4,100h0A69.68,69.68,0,0,1,100,30.4m0-.8A70.4,70.4,0,1,0,170.4,100,70.4,70.4,0,0,0,100,29.6h0Z" style="fill:#4196ff;opacity:0.25999999046325684;isolation:isolate" />
        <circle cx="100" cy="100" r="0.47" style="fill:#cc3c35;fill-opacity:0" />
        <path d="M100,8V28a72,72,0,0,1,72,72h20A92,92,0,0,0,100,8Z" style="fill:#f8ca00" />
        <path d="M8,100H28a72,72,0,0,1,72-72V8A92,92,0,0,0,8,100Z" style="fill:#f00" />
        <path d="M100,192V172a72,72,0,0,1-72-72H8A92,92,0,0,0,100,192Z" style="fill:#f43b42" />
        <path d="M192,100H172a72,72,0,0,1-72,72v20A92,92,0,0,0,192,100Z" style="fill:#fc8358" />
        <text transform="translate(146.31 35.77) rotate(45)" style="isolation:isolate;font-size:12.500060081481934px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ commonName }}</text>
        <text transform="translate(150.42 169.77) rotate(-45)" style="isolation:isolate;font-size:12.500060081481934px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ importantName }}</text>
        <text transform="translate(32.77 152.04) rotate(45)" style="isolation:isolate;font-size:12.500060081481934px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ seriousName }}</text>
        <text transform="translate(34.42 56.17) rotate(-45)" style="isolation:isolate;font-size:12.500060081481934px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ urgentName }}</text>
  <!--      <image class="scaner" width="735" height="736" transform="translate(29.6 29.6) scale(0.19 0.19)" xlink:href="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" />-->
        <circle cx="132.8" cy="132.8" r="4" style="fill:#e3bb26;fill-opacity:0.30000001192092896" />
        <circle cx="132.8" cy="132.8" r="2.4" style="fill:#e3bb26;fill-opacity:0.6000000238418579" />
        <circle cx="132.8" cy="132.8" r="1.2" style="fill:#e3bb26" />
        <circle cx="132.8" cy="69.6" r="4" style="fill:#4fa5c2;fill-opacity:0.30000001192092896" />
        <circle cx="132.8" cy="69.6" r="2.4" style="fill:#4fa5c2;fill-opacity:0.6000000238418579" />
        <circle cx="132.8" cy="69.6" r="1.2" style="fill:#4fa5c2" />
        <circle cx="68.8" cy="132.8" r="4" style="fill:#e27b56;fill-opacity:0.30000001192092896" />
        <circle cx="68.8" cy="132.8" r="2.4" style="fill:#e27b56;fill-opacity:0.6000000238418579" />
        <circle cx="68.8" cy="132.8" r="1.2" style="fill:#e27b56" />
        <circle cx="68.8" cy="69.6" r="4" style="fill:#d73d40;fill-opacity:0.30000001192092896" />
        <circle cx="68.8" cy="69.6" r="2.4" style="fill:#d73d40;fill-opacity:0.6000000238418579" />
        <circle cx="68.8" cy="69.6" r="1.2" style="fill:#d73d40" />
        <text transform="translate(63.89 90.49)" style="isolation:isolate;font-size:14px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ alarmMonitorData ? alarmMonitorData["urgent"] : 0 }}</text>
        <text transform="translate(63.89 122.22)" style="isolation:isolate;font-size:14px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ alarmMonitorData ? alarmMonitorData["serious"] : 0 }}</text>
        <text transform="translate(127.89 122.22)" style="isolation:isolate;font-size:14px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ alarmMonitorData ? alarmMonitorData["important"] : 0 }}</text>
        <text transform="translate(124.59 88.89)" style="isolation:isolate;font-size:14px;fill:#fff;font-family:MicrosoftYaHei, Microsoft YaHei">{{ alarmMonitorData ? alarmMonitorData["secondary"] : 0 }}</text>
      </g>
    </svg>
    <svg v-show="alarmLevels.length === 3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <g>
        <g>
          <circle style="opacity:0.2;fill-rule:evenodd;clip-rule:evenodd;fill:#4196FF;" cx="100" cy="100" r="100" />
        </g>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;fill-opacity:0.6;" cx="100" cy="100" r="92" />
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <radialGradient id="real_time_alarm_statistics_3_1_" cx="100" cy="100" r="92" gradientUnits="userSpaceOnUse">
            <stop offset="0.836" style="stop-color:#FFFFFF;stop-opacity:0.05" />
            <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          </radialGradient>
          <path style="fill:url(#real_time_alarm_statistics_3_1_);" d="M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#091C38;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <g style="opacity:0.5;">
            <path style="fill:#FFFFFF;" d="M100,11c49.075,0,89,39.925,89,89c0,49.075-39.925,89-89,89s-89-39.925-89-89C11,50.925,50.925,11,100,11 M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
          </g>
        </g>
        <radialGradient id="real_time_alarm_statistics_3_2_" cx="100" cy="100" r="72.8008" gradientUnits="userSpaceOnUse">
          <stop offset="0.9032" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.05" />
        </radialGradient>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:url(#real_time_alarm_statistics_3_2_);fill-opacity:0.6;" cx="100" cy="100" r="72.801" />
        <path style="fill:#091C38;" d="M100,27.6c-39.984,0-72.4,32.413-72.4,72.4s32.416,72.4,72.4,72.4c39.986,0,72.4-32.413,72.4-72.4S139.986,27.6,100,27.6L100,27.6z" />
        <g style="opacity:0.2;">
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="29.6" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.778" y2="32" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.801" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="50.219" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="64.801" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="81.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="29.6" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="149.781" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.803" y2="160.968" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.779" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="170.399" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="160.967" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="149.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.968" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="170.4" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="81.777" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.967" y2="64.798" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="50.218" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="32" />
        </g>
        <path style="opacity:0.1;fill:#4196FF;" d="M100,96.434c1.969,0,3.568,1.598,3.568,3.566s-1.6,3.566-3.568,3.566s-3.568-1.598-3.568-3.566S98.031,96.434,100,96.434 M100,95.633c-2.412,0-4.369,1.955-4.369,4.367s1.957,4.367,4.369,4.367s4.367-1.955,4.367-4.367S102.412,95.633,100,95.633L100,95.633z" />
        <path style="opacity:0.12;fill:#4196FF;" d="M100,88.18c6.52,0,11.822,5.301,11.822,11.82S106.52,111.82,100,111.82S88.176,106.52,88.176,100S93.48,88.18,100,88.18 M100,87.379c-6.972,0-12.621,5.65-12.621,12.621s5.649,12.621,12.621,12.621s12.621-5.65,12.621-12.621S106.972,87.379,100,87.379L100,87.379z" />
        <path style="opacity:0.14;fill:#4196FF;" d="M100,79.924c11.071,0,20.077,9.006,20.077,20.076s-9.006,20.076-20.077,20.076S79.923,111.07,79.923,100S88.929,79.924,100,79.924 M100,79.123c-11.531,0-20.877,9.347-20.877,20.877s9.346,20.876,20.877,20.876c11.529,0,20.877-9.346,20.877-20.876S111.529,79.123,100,79.123L100,79.123z" />
        <path style="opacity:0.16;fill:#4196FF;" d="M100,71.67c15.623,0,28.33,12.708,28.33,28.33s-12.707,28.33-28.33,28.33S71.67,115.622,71.67,100S84.377,71.67,100,71.67 M100,70.869c-16.09,0-29.131,13.045-29.131,29.131S83.91,129.131,100,129.131s29.131-13.045,29.131-29.131S116.09,70.869,100,70.869L100,70.869z" />
        <path style="opacity:0.18;fill:#4196FF;" d="M100,63.416c20.173,0,36.584,16.412,36.584,36.584c0,20.173-16.411,36.584-36.584,36.584c-20.174,0-36.584-16.411-36.584-36.584C63.416,79.828,79.826,63.416,100,63.416M100,62.615c-20.646,0-37.385,16.738-37.385,37.385c0,20.646,16.738,37.385,37.385,37.385s37.385-16.739,37.385-37.385C137.385,79.354,120.646,62.615,100,62.615L100,62.615z" />
        <path style="opacity:0.2;fill:#4196FF;" d="M100,55.163c24.724,0,44.84,20.112,44.84,44.837s-20.116,44.837-44.84,44.837c-24.725,0-44.84-20.112-44.84-44.837S75.275,55.163,100,55.163 M100,54.363c-25.205,0-45.641,20.432-45.641,45.637S74.795,145.637,100,145.637s45.637-20.432,45.637-45.637S125.205,54.363,100,54.363L100,54.363z" />
        <path style="opacity:0.22;fill:#4196FF;" d="M100,46.906c29.275,0,53.092,23.818,53.092,53.094S129.275,153.094,100,153.094S46.906,129.275,46.906,100S70.725,46.906,100,46.906 M100,46.109c-29.765,0-53.891,24.127-53.891,53.891c0,29.763,24.126,53.891,53.891,53.891s53.891-24.128,53.891-53.891C153.891,70.236,129.765,46.109,100,46.109L100,46.109z" />
        <path style="opacity:0.24;fill:#4196FF;" d="M100,38.654c33.826,0,61.346,27.52,61.346,61.346s-27.52,61.346-61.346,61.346S38.654,133.826,38.654,100S66.174,38.654,100,38.654 M100,37.854c-34.322,0-62.146,27.823-62.146,62.146c0,34.32,27.824,62.146,62.146,62.146S162.146,134.32,162.146,100C162.146,65.677,134.322,37.854,100,37.854L100,37.854z" />
        <path style="opacity:0.26;fill:#4196FF;" d="M100,30.4c38.378,0,69.6,31.222,69.6,69.6s-31.222,69.6-69.6,69.6S30.4,138.378,30.4,100S61.622,30.4,100,30.4 M100,29.6c-38.881,0-70.4,31.521-70.4,70.4c0,38.879,31.52,70.4,70.4,70.4c38.883,0,70.4-31.521,70.4-70.4C170.4,61.12,138.883,29.6,100,29.6L100,29.6z" />
        <circle style="opacity:0;fill:#F43B42;" cx="100" cy="100" r="0.471" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" d="M100,8C65.95,8,36.223,26.499,20.314,53.994l17.339,10.01C50.104,42.486,73.353,28,100,28c26.648,0,49.896,14.487,62.347,36.004l17.339-10.01C163.777,26.499,134.05,8,100,8z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;" d="M162.347,64.004C168.475,74.596,172,86.883,172,100c0,39.768-32.237,72-72,72v20c50.811,0,92-41.189,92-92c0-16.761-4.484-32.473-12.314-46.006L162.347,64.004z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" d="M28,100c0-13.118,3.525-25.404,9.654-35.996l-17.34-10.011C12.484,67.527,8,83.239,8,100c0,50.811,41.189,92,92,92v-20C60.232,172,28,139.764,28,100z" />
        <g>
          <text transform="matrix(0.5 -0.866 0.866 0.5 166.7588 154.3428)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ importantName }}</text>
        </g>
        <g>
          <text transform="matrix(0.5 0.866 -0.866 0.5 21.5938 132.8682)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ seriousName }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 87.5 22.5889)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ urgentName }}</text>
        </g>
      </g>
  <!--    <image class="scaner" style="overflow:visible;" width="734" height="734" xlink:href="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" transform="matrix(0.192 0 0 0.192 29.5996 29.5996)" />-->
      <g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;fill-opacity:0.3;" d="M147,122.579c0,2.209-1.79,3.998-3.998,3.998c-2.211,0-4.002-1.789-4.002-3.998c0-2.211,1.791-4.002,4.002-4.002C145.21,118.577,147,120.368,147,122.579z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;fill-opacity:0.6;" cx="143" cy="122.579" r="2.399" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F8CA00;" cx="143.002" cy="122.579" r="1.2" />
        </g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.3;" d="M62,122.579c0,2.209-1.791,3.998-4.001,3.998c-2.208,0-3.999-1.789-3.999-3.998c0-2.211,1.791-4.002,3.999-4.002C60.209,118.577,62,120.368,62,122.579z" />
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.6;" d="M60.4,122.579c0,1.324-1.076,2.398-2.401,2.398c-1.323,0-2.401-1.074-2.401-2.398c0-1.326,1.078-2.4,2.401-2.4C59.324,120.179,60.4,121.253,60.4,122.579z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" cx="57.999" cy="122.579" r="1.2" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.3;" cx="100" cy="49.001" r="4" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.6;" cx="99.999" cy="49.001" r="2.401" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" cx="99.999" cy="49.001" r="1.2" />
        </g>
        <g>
          <text transform="matrix(1 0 0 1 95.0938 69.8911)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["urgent"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 53.0938 112)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["serious"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 138.0957 112.001)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["important"] : 0 }}</text>
        </g>
      </g>
    </svg>
    <svg v-show="alarmLevels.length === 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <g>
        <g>
          <circle style="opacity:0.2;fill-rule:evenodd;clip-rule:evenodd;fill:#4196FF;" cx="100" cy="100" r="100" />
        </g>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;fill-opacity:0.6;" cx="100" cy="100" r="92" />
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <radialGradient id="real_time_alarm_statistics_2_1_" cx="100" cy="100" r="92" gradientUnits="userSpaceOnUse">
            <stop offset="0.836" style="stop-color:#FFFFFF;stop-opacity:0.05" />
            <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          </radialGradient>
          <path style="fill:url(#real_time_alarm_statistics_2_1_);" d="M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#091C38;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <g style="opacity:0.5;">
            <path style="fill:#FFFFFF;" d="M100,11c49.075,0,89,39.925,89,89c0,49.075-39.925,89-89,89s-89-39.925-89-89C11,50.925,50.925,11,100,11 M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
          </g>
        </g>
        <radialGradient id="real_time_alarm_statistics_2_2_" cx="100" cy="100" r="72.8008" gradientUnits="userSpaceOnUse">
          <stop offset="0.9032" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.05" />
        </radialGradient>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:url(#real_time_alarm_statistics_2_2_);fill-opacity:0.6;" cx="100" cy="100" r="72.801" />
        <path style="fill:#091C38;" d="M100,27.6c-39.984,0-72.4,32.413-72.4,72.4s32.416,72.4,72.4,72.4c39.986,0,72.4-32.413,72.4-72.4S139.986,27.6,100,27.6L100,27.6z" />
        <g style="opacity:0.2;">
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="29.6" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.778" y2="32" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.801" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="50.219" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="64.801" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="81.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="29.6" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="149.781" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.803" y2="160.968" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.779" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="170.399" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="160.967" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="149.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.968" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="170.4" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="81.777" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.967" y2="64.798" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="50.218" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="32" />
        </g>
        <path style="opacity:0.1;fill:#4196FF;" d="M100,96.434c1.969,0,3.568,1.598,3.568,3.566s-1.6,3.566-3.568,3.566s-3.568-1.598-3.568-3.566S98.031,96.434,100,96.434 M100,95.633c-2.412,0-4.369,1.955-4.369,4.367s1.957,4.367,4.369,4.367s4.367-1.955,4.367-4.367S102.412,95.633,100,95.633L100,95.633z" />
        <path style="opacity:0.12;fill:#4196FF;" d="M100,88.18c6.52,0,11.822,5.301,11.822,11.82S106.52,111.82,100,111.82S88.176,106.52,88.176,100S93.48,88.18,100,88.18 M100,87.379c-6.972,0-12.621,5.65-12.621,12.621s5.649,12.621,12.621,12.621s12.621-5.65,12.621-12.621S106.972,87.379,100,87.379L100,87.379z" />
        <path style="opacity:0.14;fill:#4196FF;" d="M100,79.924c11.071,0,20.077,9.006,20.077,20.076s-9.006,20.076-20.077,20.076S79.923,111.07,79.923,100S88.929,79.924,100,79.924 M100,79.123c-11.531,0-20.877,9.347-20.877,20.877s9.346,20.876,20.877,20.876c11.529,0,20.877-9.346,20.877-20.876S111.529,79.123,100,79.123L100,79.123z" />
        <path style="opacity:0.16;fill:#4196FF;" d="M100,71.67c15.623,0,28.33,12.708,28.33,28.33s-12.707,28.33-28.33,28.33S71.67,115.622,71.67,100S84.377,71.67,100,71.67 M100,70.869c-16.09,0-29.131,13.045-29.131,29.131S83.91,129.131,100,129.131s29.131-13.045,29.131-29.131S116.09,70.869,100,70.869L100,70.869z" />
        <path style="opacity:0.18;fill:#4196FF;" d="M100,63.416c20.173,0,36.584,16.412,36.584,36.584c0,20.173-16.411,36.584-36.584,36.584c-20.174,0-36.584-16.411-36.584-36.584C63.416,79.828,79.826,63.416,100,63.416M100,62.615c-20.646,0-37.385,16.738-37.385,37.385c0,20.646,16.738,37.385,37.385,37.385s37.385-16.739,37.385-37.385C137.385,79.354,120.646,62.615,100,62.615L100,62.615z" />
        <path style="opacity:0.2;fill:#4196FF;" d="M100,55.163c24.724,0,44.84,20.112,44.84,44.837s-20.116,44.837-44.84,44.837c-24.725,0-44.84-20.112-44.84-44.837S75.275,55.163,100,55.163 M100,54.363c-25.205,0-45.641,20.432-45.641,45.637S74.795,145.637,100,145.637s45.637-20.432,45.637-45.637S125.205,54.363,100,54.363L100,54.363z" />
        <path style="opacity:0.22;fill:#4196FF;" d="M100,46.906c29.275,0,53.092,23.818,53.092,53.094S129.275,153.094,100,153.094S46.906,129.275,46.906,100S70.725,46.906,100,46.906 M100,46.109c-29.765,0-53.891,24.127-53.891,53.891c0,29.763,24.126,53.891,53.891,53.891s53.891-24.128,53.891-53.891C153.891,70.236,129.765,46.109,100,46.109L100,46.109z" />
        <path style="opacity:0.24;fill:#4196FF;" d="M100,38.654c33.826,0,61.346,27.52,61.346,61.346s-27.52,61.346-61.346,61.346S38.654,133.826,38.654,100S66.174,38.654,100,38.654 M100,37.854c-34.322,0-62.146,27.823-62.146,62.146c0,34.32,27.824,62.146,62.146,62.146S162.146,134.32,162.146,100C162.146,65.677,134.322,37.854,100,37.854L100,37.854z" />
        <path style="opacity:0.26;fill:#4196FF;" d="M100,30.4c38.378,0,69.6,31.222,69.6,69.6s-31.222,69.6-69.6,69.6S30.4,138.378,30.4,100S61.622,30.4,100,30.4 M100,29.6c-38.881,0-70.4,31.521-70.4,70.4c0,38.879,31.52,70.4,70.4,70.4c38.883,0,70.4-31.521,70.4-70.4C170.4,61.12,138.883,29.6,100,29.6L100,29.6z" />
        <circle style="opacity:0;fill:#F43B42;" cx="100" cy="100" r="0.471" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" d="M100,8C49.189,8,8,49.189,8,100h20c0-39.768,32.236-72,72-72c39.768,0,72,32.236,72,72h20C192,49.189,150.811,8,100,8z" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" d="M172,100c0,39.768-32.237,72-72,72c-39.768,0-72-32.236-72-72H8c0,50.811,41.189,92,92,92s92-41.189,92-92H172z" />
        <g>
          <text transform="matrix(1 0 0 1 88 23)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ urgentName }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 88 187)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:12.5001;">{{ seriousName }}</text>
        </g>
      </g>
  <!--    <image class="scaner" style="overflow:visible;" width="734" height="734" xlink:href="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" transform="matrix(0.192 0 0 0.192 29.5996 29.5996)" />-->
      <g>
        <g>
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.3;" d="M105,132.801c0,2.209-1.791,3.998-4.001,3.998c-2.208,0-3.999-1.789-3.999-3.998c0-2.211,1.791-4.002,3.999-4.002C103.209,128.799,105,130.59,105,132.801z" />
          <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;fill-opacity:0.6;" d="M103.4,132.801c0,1.324-1.076,2.398-2.401,2.398c-1.323,0-2.401-1.074-2.401-2.398c0-1.326,1.078-2.4,2.401-2.4C102.324,130.4,103.4,131.475,103.4,132.801z" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#FC8358;" cx="100.999" cy="132.801" r="1.2" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.3;" cx="101" cy="69.6" r="4" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.6;" cx="100.999" cy="69.6" r="2.401" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" cx="100.999" cy="69.6" r="1.2" />
        </g>
        <g>
          <text transform="matrix(1 0 0 1 96.0938 90.4897)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["urgent"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 96.0938 122.2217)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["serious"] : 0 }}</text>
        </g>
      </g>
    </svg>
    <svg v-show="alarmLevels.length === 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <g>
        <g>
          <circle style="opacity:0.2;fill-rule:evenodd;clip-rule:evenodd;fill:#4196FF;" cx="100" cy="100" r="100" />
        </g>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;fill-opacity:0.6;" cx="100" cy="100" r="92" />
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#D0E3EA;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <radialGradient id="real_time_alarm_statistics_1_1_" cx="100" cy="100" r="92" gradientUnits="userSpaceOnUse">
            <stop offset="0.836" style="stop-color:#FFFFFF;stop-opacity:0.05" />
            <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          </radialGradient>
          <path style="fill:url(#real_time_alarm_statistics_1_1_);" d="M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
        </g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#091C38;" cx="100" cy="100" r="92" />
        </g>
        <g>
          <g style="opacity:0.5;">
            <path style="fill:#FFFFFF;" d="M100,11c49.075,0,89,39.925,89,89c0,49.075-39.925,89-89,89c-49.075,0-89-39.925-89-89C11,50.925,50.925,11,100,11 M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8L100,8z" />
          </g>
        </g>
        <radialGradient id="real_time_alarm_statistics_1_2_" cx="100" cy="100" r="72.8008" gradientUnits="userSpaceOnUse">
          <stop offset="0.9032" style="stop-color:#D0E3EA;stop-opacity:0.9" />
          <stop offset="1" style="stop-color:#D0E3EA;stop-opacity:0.05" />
        </radialGradient>
        <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:url(#real_time_alarm_statistics_1_2_);fill-opacity:0.6;" cx="100" cy="100" r="72.801" />
        <path style="fill:#091C38;" d="M100,27.6c-39.984,0-72.4,32.413-72.4,72.4s32.416,72.4,72.4,72.4c39.986,0,72.4-32.413,72.4-72.4S139.986,27.6,100,27.6L100,27.6z" />
        <g style="opacity:0.2;">
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="29.6" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.778" y2="32" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.801" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="50.219" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="64.801" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="81.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="29.6" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="31.998" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="39.032" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="50.219" y2="149.781" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="64.803" y2="160.968" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="81.779" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="100" y2="170.399" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="168" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="160.967" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="149.778" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.968" y2="135.199" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="118.222" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="170.4" y2="100" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="168.004" y2="81.777" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="160.967" y2="64.798" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="149.781" y2="50.218" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="135.198" y2="39.032" />
          <line style="fill:none;stroke:#4196FF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="100" y1="100" x2="118.221" y2="32" />
        </g>
        <path style="opacity:0.1;fill:#4196FF;" d="M100,96.434c1.969,0,3.568,1.598,3.568,3.566s-1.6,3.566-3.568,3.566s-3.568-1.598-3.568-3.566S98.031,96.434,100,96.434 M100,95.633c-2.412,0-4.369,1.955-4.369,4.367s1.957,4.367,4.369,4.367s4.367-1.955,4.367-4.367S102.412,95.633,100,95.633L100,95.633z" />
        <path style="opacity:0.12;fill:#4196FF;" d="M100,88.18c6.52,0,11.822,5.301,11.822,11.82S106.52,111.82,100,111.82S88.176,106.52,88.176,100S93.48,88.18,100,88.18 M100,87.379c-6.972,0-12.621,5.65-12.621,12.621s5.649,12.621,12.621,12.621s12.621-5.65,12.621-12.621S106.972,87.379,100,87.379L100,87.379z" />
        <path style="opacity:0.14;fill:#4196FF;" d="M100,79.924c11.071,0,20.077,9.006,20.077,20.076s-9.006,20.076-20.077,20.076S79.923,111.07,79.923,100S88.929,79.924,100,79.924 M100,79.123c-11.531,0-20.877,9.347-20.877,20.877s9.346,20.876,20.877,20.876c11.529,0,20.877-9.346,20.877-20.876S111.529,79.123,100,79.123L100,79.123z" />
        <path style="opacity:0.16;fill:#4196FF;" d="M100,71.67c15.623,0,28.33,12.708,28.33,28.33s-12.707,28.33-28.33,28.33S71.67,115.622,71.67,100S84.377,71.67,100,71.67 M100,70.869c-16.09,0-29.131,13.045-29.131,29.131S83.91,129.131,100,129.131s29.131-13.045,29.131-29.131S116.09,70.869,100,70.869L100,70.869z" />
        <path style="opacity:0.18;fill:#4196FF;" d="M100,63.416c20.173,0,36.584,16.412,36.584,36.584c0,20.173-16.411,36.584-36.584,36.584c-20.174,0-36.584-16.411-36.584-36.584C63.416,79.828,79.826,63.416,100,63.416M100,62.615c-20.646,0-37.385,16.738-37.385,37.385c0,20.646,16.738,37.385,37.385,37.385s37.385-16.739,37.385-37.385C137.385,79.354,120.646,62.615,100,62.615L100,62.615z" />
        <path style="opacity:0.2;fill:#4196FF;" d="M100,55.163c24.724,0,44.84,20.112,44.84,44.837s-20.116,44.837-44.84,44.837c-24.725,0-44.84-20.112-44.84-44.837S75.275,55.163,100,55.163 M100,54.363c-25.205,0-45.641,20.432-45.641,45.637S74.795,145.637,100,145.637s45.637-20.432,45.637-45.637S125.205,54.363,100,54.363L100,54.363z" />
        <path style="opacity:0.22;fill:#4196FF;" d="M100,46.906c29.275,0,53.092,23.818,53.092,53.094S129.275,153.094,100,153.094S46.906,129.275,46.906,100S70.725,46.906,100,46.906 M100,46.109c-29.765,0-53.891,24.127-53.891,53.891c0,29.763,24.126,53.891,53.891,53.891s53.891-24.128,53.891-53.891C153.891,70.236,129.765,46.109,100,46.109L100,46.109z" />
        <path style="opacity:0.24;fill:#4196FF;" d="M100,38.654c33.826,0,61.346,27.52,61.346,61.346s-27.52,61.346-61.346,61.346S38.654,133.826,38.654,100S66.174,38.654,100,38.654 M100,37.854c-34.322,0-62.146,27.823-62.146,62.146c0,34.32,27.824,62.146,62.146,62.146S162.146,134.32,162.146,100C162.146,65.677,134.322,37.854,100,37.854L100,37.854z" />
        <path style="opacity:0.26;fill:#4196FF;" d="M100,30.4c38.378,0,69.6,31.222,69.6,69.6s-31.222,69.6-69.6,69.6S30.4,138.378,30.4,100S61.622,30.4,100,30.4 M100,29.6c-38.881,0-70.4,31.521-70.4,70.4c0,38.879,31.52,70.4,70.4,70.4c38.883,0,70.4-31.521,70.4-70.4C170.4,61.12,138.883,29.6,100,29.6L100,29.6z" />
        <circle style="opacity:0;fill:#F43B42;" cx="100" cy="100" r="0.471" />
        <path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" d="M100,8C49.189,8,8,49.189,8,100s41.189,92,92,92s92-41.189,92-92S150.811,8,100,8z M100,172c-39.768,0-72-32.236-72-72c0-39.768,32.236-72,72-72c39.768,0,72,32.236,72,72C172,139.768,139.763,172,100,172z" />
      </g>
  <!--    <image class="scaner" style="overflow:visible;" width="734" height="734" xlink:href="@/assets/customComponents/RealTimeAlarmStatistics/scanner.png" transform="matrix(0.192 0 0 0.192 29.5996 29.5996)" />-->
      <g>
        <g>
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.3;" cx="101" cy="101.001" r="4" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;fill-opacity:0.6;" cx="100.999" cy="101.001" r="2.401" />
          <circle style="fill-rule:evenodd;clip-rule:evenodd;fill:#F43B42;" cx="100.999" cy="101.001" r="1.2" />
        </g>
        <g>
          <text transform="matrix(1 0 0 1 96.0933 121.8906)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ alarmMonitorData ? alarmMonitorData["urgent"] : 0 }}</text>
        </g>
        <g>
          <text transform="matrix(1 0 0 1 86.1982 84)" style="fill:#FFFFFF; font-family:'MicrosoftYaHei'; font-size:14;">{{ urgentName }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps(['urgentName', 'seriousName', 'importantName', 'commonName', 'eventName', 'alarmMonitorData', 'alarmLevels'])
const { urgentName, seriousName, importantName, commonName, eventName, alarmMonitorData, alarmLevels } = toRefs(props)
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from { transform: scale(0.69) rotate(0);}
  to { transform: scale(0.69) rotate(360deg);}
}
.box{
  position: relative;
  .scaner{
    position: absolute;
    top: -1.5%;
    left: -0.5%;
    animation: rotate linear 5s infinite;
    width: 100%;
    height: 100%;
  }
}

</style>
