<!DOCTYPE html>
<html lang="en">
	<head>
	</head>
	<body>
		<div class="container">
			<h1># LMSPlayer<br>LMS player can play content</h1>
			<h3>Introduction</h3>
			<p>Before HTML5, the content we used to play in a browser with a plug-in like Flash but the HTML5 &lt;Video&gt; element specified a standard way to embed a video in a web page.</p>
			<p>HTML5 has attributes that allows adding controls like play/pause and volume. It also provides the built in resume functionality.</p>
			<p><img src="images/html5-attributes.png"></p>
			<br>
			<h3>HTML5 Video - Media Types</h3>
			<ul>
				<li>Media formats like:</li>
				<ul>
					<li>MP4</li>
					<li>WebM</li>
					<li>Ogg</li>
				</ul>
			</ul>
			<p>&nbsp;</p>
			<h3>HTML5 Video - Browser Support</h3>
			<table width="100%" class="centre" frame="box" rules="all">
				<tbody>
					<tr>
						<th width="25%">
							<p><strong>Browser</strong></p>
						</th>
						<th width="25%">
							<p><strong>MP4</strong></p>
						</th>
						<th width="25%">
							<p><strong>WebM</strong></p>
						</th>
						<th width="25%">
							<p><strong>Ogg</strong></p>
						</th>
					</tr>
					<tr>
						<td width="25%">
							<p><strong>Internet Explorer</strong></p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>NO</p>
						</td>
						<td width="25%">
							<p>NO</p>
						</td>
					</tr>
					<tr>
						<td width="25%">
							<p><strong>Chrome</strong></p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
					</tr>
					<tr>
						<td width="25%">
							<p><strong>Firefox</strong></p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
					</tr>
					<tr>
						<td width="25%">
							<p><strong>Safari</strong></p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>NO</p>
						</td>
						<td width="25%">
							<p>NO</p>
						</td>
					</tr>
					<tr>
						<td width="25%">
							<p><strong>Opera</strong></p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
						<td width="25%">
							<p>YES</p>
						</td>
					</tr>
				</tbody>
			</table>
			<p>&nbsp;</p>
			<h3>Controls</h3>
			<table width="100%" class="centre" frame="box" rules="all" s tyle="display:block;">
				<tbody>
					<tr>
						<th width="15%">
							<p><strong>Sr. No.</strong></p>
						</th>
						<th width="20%">
							<p><strong>Name of Buttons</strong></p>
						</th>
						<th width="35%">
							<p><strong>Function</strong></p>
						</th>
						<th width="30%">
							<p><strong>Identity</strong></p>
						</th>
					</tr>
					<tr>
						<td>
							<p><strong>1 </strong></p>
						</td>
						<td>
							<p>Volume control</p>
						</td>
						<td>
							<p>Control the volume (Increase / decrease / mute)</p>
						</td>
						<td><img src="images/vol.jpg"></td>
					</tr>
					<tr>
						<td>
							<p><strong>2</strong></p>
						</td>
						<td>
							<p>Play / Pause</p>
						</td>
						<td>
							<p>Play / Pause the video, by clicking on this button</p>
						</td>
						<td><img src="images/play.jpg"></td>
					</tr>
					<tr>
						<td>
							<p><strong>3 </strong></p>
						</td>
						<td>
							<p>Auto Mode</p>
						</td>
						<td>
							<p>Once clicked, will remain on the same segment and will not move to next segment.</p>
						</td>
						<td><img src="images/auto.jpg"></td>
					</tr>
					<tr>
						<td>
							<p><strong>4</strong></p>
						</td>
						<td>
							<p>Slider</p>
						</td>
						<td>
							<p>Move the nugget back and forward by clicking on it and drag it forward / backward</p>
						</td>
						<td wi dth="177"><img src="images/slider.jpg"></td>
					</tr>
					<tr>
						<td>
							<p><strong>5</strong></p>
						</td>
						<td>
							<p>Total time</p>
						</td>
						<td>
							<p>Tells the total duration of nugget</p>
						</td>
						<td><img src="images/time.jpg"></td>
					</tr>
				</tbody>
			</table>
			<p>&nbsp;</p>
			<h3>Features</h3>
			<ul>
				<li>Buttons are available on the player to play, pause, rewind and forward (through slider bar), auto mode, Total &amp; Remaining time etc. to function the content.
				<p><img src="images/controls.png"></p></li>
				<li>In player, the content cannot be forwarded through a slider which is not completed but have an option to back and forward the content whatever has been played. This functionality is configurable.</li>
				<li>For activities section- it always start from the beginning of that segment. There is no option for restart/resume.
				<p><img src="images/activity.png" width="50%"></p></li>
				<p>&nbsp;</p>
				<li>Activities that run in the player are like webpages/screens that are created using HTML5, CSS, Angular. These webpages contain functionalities like:
				<br><br>		
					<ol type="1">
						<li>User can select one answer for the asked question
						<p><img src="images/singletrue.png" width="50%"></p>
						</li>
						<p>&nbsp;</p>
						<li>User can select/deselect multiple answer for the asked question
						<p><img src="images/multians1.png" width="50%"></p>
						<p><img src="images/multians2.png" width="50%"></p>
						</li>
						<p>&nbsp;</p>
						<li>User also have options to move back or forward by clicking back/forward buttons inside the activity.</li>
						<li>Firework effect on selecting a correct option
						<p><img src="images/fireworks1.png" width="50%"></p>
						<p><img src="images/fireworks2.png" width="50%"></p>
						</li>
						<p>&nbsp;</p>
						<li>Shaking, Shuffling and Buzzer sound on selecting a wrong option.</li>
						<li>On answering a question correctly application automatically navigates to the next question in that activity (except for last question in the activity). At the last question of the activity aage badhein starts blinking after the user has answered the
							question correctly.</li>
						<li>A help button is placed to re-hear the audio.</li>
					</ol>
				</li>
				<li>Webpages/content screen is fully responsive i.e. it works on any screen resolution.
				<p><img src="images/responsive.png" width="50%"></p>
				</li>
				<li>Web pages can be viewed using many different devices: desktops, tablets, Web.</li>
				<li>Design, Color, Images are dynamic and can be changed as per requirement.<p>&nbsp;</p></li>
			</ul>
		</div>	
		<br>
		<div class="container">
			<h3>Creating New Content - for Activity Template</h3>
			<p><b>> Create a New Content Folder</b><br>- Initially you will get the folder structure as below:</p>			
			<p><img src="images/folderStructure.png"></p>
			<p>- Go to <b><i>sample_content</i></b> folder and create a <b>'public'</b> folder.</p>			
			<p><img src="images/publicFolder.png"></p>
			<p>- In public folder create a <b>New Folder</b>, e.g. create 'content1'.</p>			
			<p><img src="images/createFolder.png"></p>
			<p>
			- Create a <b>base.json</b> file inside <i>content1</i> folder. Internal structure of <i>base.json</i> looks as below – 
				<pre>
					{
						"autoplay": false,
						"contents": [
							"Q1",
							"Q2",
							"Q3"
						]
					}
				</pre>
			</p>
			<p><b>> Sequence of Question</b><br><blockquote>You will get questions in same sequence as it appears in 'base.json'. You can re-arrange the sequence of questions in 'base.json'.</blockquote></p>	<br>		
			<p><b>> Autoplay</b><br><blockquote>If autoplay (in 'base.json') is set to <b>true</b>, then the player will move on to the next activity after completion of the current playing activity. If autoplay is set to <b>false</b> then it will stay on the last question of the current playing activity.</blockquote></p><br>
			<p><b>> Contents</b><br>
			<blockquote>
				'contents' (in 'base.json') holds the list of all questions. In the above json file (base.json), there are three questions. Each question (Q1,Q2,Q3) represents their individual .json file such as <i>Q1.json</i>, <i>Q2.json</i>, <i>Q3.json</i>.<br>
				Sample structure of the json file will be as follows– 
				<pre>
				{
					"data": "Q1/Q1_data",
					"design": "Q1/Q1_design",
					"logic": "Q1/Q1_logic"
				}
				</pre>
			</blockquote></p><br>		
			<p><b>> Data</b><br>
			<blockquote>
				<b>'data'</b> points to a json file (<i>Q1_data.json</i>) which is inside the folder name <b>Q1</b>.<br>
				The file <b>Q1_data.json</b> consists of all the assets (Audio, Video, Images) required in a template. <br>The structure of <i>Q1_data.json</i> is shown below – 
				<pre>
				{
					"id": "Q001",
					"ques": {
						"text": "",
						"sound": "http://localhost:8080/tempfive/Q1.ogg",
						"imgsrc": "http://localhost:8080/tempfive/q1.png",
						"imgsrc_hover": "http://localhost:8080/tempfive/q1_hover.svg",
						"imgsrc_original": "http://localhost:8080/tempfive/q1.png"
					},
					"options": [{
							"id": "001",
							"custom_id": "0",
							"imgsrc": "http://localhost:8080/tempfive/q1_opt1.svg"
						},{
							"id": "002",
							"custom_id": "1",
							"imgsrc": "http://localhost:8080/tempfive/q1_opt2.svg"
						},{
							"id": "003",
							"custom_id": "2",
							"imgsrc": "http://localhost:8080/tempfive/q1_opt3.svg"
						}
					],
					"feedback": {
						"correct_ans_index": "2"
					}
				}
				</pre>
			</blockquote></p><br>
			<p><b>> Design</b><br>
			<blockquote>Here we put all the <b>Design</b> configuration to change the <i>look and feel</i> <b>dynamically</b>.</blockquote></p>
			<br>
			<p><b>> Logic</b><br>
				<blockquote>Here we put all the <b>Logic</b> configuration to change the <i>look and feel</i> <b>dynamically</b>.<br>The structure of <i>logic.json</i> looks as below:<br>
				<pre>
				{
					"type": 0
				}
				</pre>
				In the above code <b>"type"</b> represents the <i>type of template</i>. <br><br>For example :
				<table cellpadding="7" frame="box" rules="all" style="font-size:14px; text-align:center;">
					<tr>
						<th>Type</th>
						<th>Type value</th>
					</tr>
					<tr>
						<td>0</td>
						<td>video template</td>
					</tr>				
					<tr>
						<td>1</td>
						<td>sound  to image</td>
					</tr>				
					<tr>
						<td>2</td>
						<td>text to image</td>
					</tr>				
				</table>
				</blockquote>
			</p><br>
			<p></p>

			
			<br>
			<h3>Template - Definition and Types</h3>
			<p>A Template is a set of predefined functionalities like <i>'Multiple choice questions'</i>, <i>'Arrange the sentence'</i> etc. All the templates have different functionalities as shown below–
			</p>
			<ul>
				<li><i>Video Template</i><blockquote>This type of template is to play the video. It can play video from a specified position. Volume can also be adjusted with the help of slider.</blockquote></li>
				<li><i>Sound to Image</i><blockquote>User listens to the audio and selects the (correct) answer from the given options.</blockquote></li>
				<li><i>Letter to Image</i><blockquote>A letter will be displayed and the user will have to identify the correct Word that begins with or contains that letter in the word.</blockquote></li>
				<li><i>Arrange the Word or Sentence</i><blockquote>User will be given a jumbled word or sentence and has to re-arrange these to create a meaningful sentence or word.
				</blockquote></li>
			</ul>
			<p>Finally, the structure of <b>"content1"</b> folder will appear as below:</p>
			<p><img src="images/contentJson.png"></p>
			<p>*The 'content1' folder setup completes here.</p>
			<br>
			<h3>Next Step - Start Node Server</h3>
			<blockquote>To start the Node Server, follow up to <i>'new player > sample_content'</i> folder and open the command prompt here (shift + right click and select '<i>open command window here</i>' from contextual menu) and start node by typing <b>run.bat</b> in the command prompt and press 'enter'.</blockquote>
			<br>
			<h3>Integration with Player</h3>
			<blockquote>Go to- <i>new player >  latest_player > src > assets > config</i><br>
			Here user will get <b>init.json</b></blockquote>
			<p><img src="images/integration.png"></p>
			<p>The structure and source of the <b>init.json</b> file is shown below:</p>
			<pre>
			{
				"environment": {
					"standalone": {
						"enabled": true,
						"data": "{\"homePath\": \"home\",\"forwardEnabled\": true,\"playerPreview\": <br>false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 201,\"file\": \"<br>http://localhost:8080/content1/\"},{\"startAt\": 0,\"segmentId\": 202,\"file\": \"http://localhost:8080/content2/\"}]}"
					},
					
					"lms": {
						"enabled": false
					}
				}
			}
			</pre>
			<p>In <i>init.json</i> file, if player is running in LMS then <i>'LMS Enabled'</i> option is true, else <i>'Standalone Enabled'</i> is true.</p>

			
			<ul>
				<li>Files <br><blockquote>In <i>init.json</i>, <b>'files'</b> shows list of all content folders.</blockquote></li>
				<li>startAt <br><blockquote>This shows the 'Time' in milliseconds, which specifies the begining time of the video. For example if you provide startAt value to 1000, then it will start video from 1 second.</blockquote></li>
				<li>Sequence of Templates <br><blockquote>You can specify the <i>sequence</i> of templates by re-arranging in init.json. In above json file first you will get template 1 and then template 2.</blockquote></li>
			</ul>
			<p>The content is now integrated with latest player, it's time to start the player by going to folder <i>new player > latest_player</i> and open command prompt from that location (shift + right click and select '<i>open command window here</i>' from contextual menu).<br>
				- Type <b>run.bat</b> in the command prompt and press 'enter'.<br>
				- Latest player will run on port no 4200. <br>
				- Hence, enter url <b>localhost:4200</b> in browser to view the content.
			</p>
			<br>
		</div>
	</body>
</html>