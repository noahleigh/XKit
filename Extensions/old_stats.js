//* TITLE Old Stats **//
//* VERSION 0.2.1 **//
//* DESCRIPTION  **//
//* DEVELOPER STUDIOXENIX **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.old_stats = new Object({

	running: false,

	/*
	old_stats_draw: function() {
        var canvas = document.getElementById('xkit-activity-canvas');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');


            var activity_sparkline = XKit.interface.user().activity.slice(1,-1).split(",");
            // Convert each string to int in array
            for (var i=0; i<activity_sparkline.length; i++) {
                activity_sparkline[i] = parseInt(activity_sparkline[i], 10);
            }

            var activity_max = getMaxOfArray(activity_sparkline);
            var activity_min = getMinOfArray(activity_sparkline);

            var path=new Path2D();

            path.moveTo(0, Math.round(15 - (activity_sparkline[0]-activity_min)/(activity_max-activity_min)*15));

            for (var n=1; n<activity_sparkline.length; n++) {
                activity_sparkline[n] = Math.round(15 - (activity_sparkline[n]-activity_min)/(activity_max-activity_min)*15);
                path.lineTo(n*3, activity_sparkline[n]);
                path.moveTo(n*3, activity_sparkline[n]);
            }

            var path=new Path2D();
            path.moveTo(0,7);
            path.lineTo(36,15);
            path.lineTo(3,0);
            //ctx.fill(path);

            ctx.stroke(path);
        }
	}, */

	run: function() {
		this.running = true;

		//XKit.tools.init_css("old_stats");

		var m_user = XKit.interface.user();

		var posts_show = " ";
		var followers_show = " ";
		var drafts_show	= " ";
		var queue_show = " ";

		if (XKit.interface.where().inbox === true) { return; }

		if (m_user.posts === 0) {
			posts_show = " count_0 ";
		}
		if (m_user.followers === 0) {
			followers_show = " count_0 ";
		}
		if (m_user.drafts === 0) {
			drafts_show = " count_0 ";
		}
		if (m_user.processing === 0) {
			processing_show = " count_0 ";
		}
		if (m_user.queue === 0) {
			queue_show = " count_0 ";
		}

		/*var m_account = $("#account_button");
		m_account.click();
		var activity_graph = document.getElementsByClassName("popover--account-popover")[0];
		window.setTimeout(function() {
			m_account.click();
		}, 1000); */


		var xf_html = '<ul data-blog-name="' + m_user.name + '" id="dashboard_controls_open_blog" class="controls_section">' +
					'<li class="no_push selected_blog">' +
						'<div class="open_blog with_subtitle">' +
							'<a class="currently_selected_blog hide_overflow blog_title">' + m_user.name + '</a>' +
							'<small>' +
								'<div class="hide_overflow">' +
									'<a target="_blank" href="http://' + m_user.name + '.tumblr.com/" class="open_blog_link" id="open_blog_link">' + m_user.title + '</a>' +
								'</div>' +
							'</small>' +
						'</div>' +
					'</li>' +
					'<li class="controls_section_item' + posts_show + '" data-blog-controls-count="post_count" id="posts_control">' +
						'<a class="control-item control-anchor posts" href="/blog/' + m_user.name + '">' +
							'<div class="hide_overflow">Posts</div>' +
							'<span class="count">' + m_user.posts.toLocaleString() + '</span>' +
						'</a>' +
					'</li>' +
					'<li class="controls_section_item' + followers_show + '" data-blog-controls-count="follower_count">' +
						'<a class="control-item control-anchor followers" href="/blog/' + m_user.name + '/followers">' +
							'<div class="hide_overflow">Followers</div>' +
							'<span class="count">' + m_user.followers.toLocaleString() + '</span>' +
						'</a>' +
					'</li>' +
					'<li class="controls_section_item popover_menu_item_blog_details">' +
						'<a class="control-item control-anchor activity" href="/blog/' + m_user.name + '/activity">' +
							'<div class="hide_overflow" id="old_stats_activity">Activity</div>' +
							'<span data-sparkline="' + m_user.activity + '" class="count sparkline">' +
								'<canvas style="display: inline-block; vertical-align: top; height: 15px; width: 36px;" width="72" height="30"></canvas>' +
							'</span>' +
						'</a>' +
					'</li>' +
					'<li class="controls_section_item' + drafts_show + '" data-blog-controls-count="draft_count">' +
						'<a class="control-item control-anchor drafts" href="/blog/' + m_user.name + '/drafts">' +
							'<div class="hide_overflow">Drafts</div>' +
							'<span class="count">' + m_user.drafts.toLocaleString() + '</span>' +
							'</a>' +
					'</li>' +
					'<li class="controls_section_item' + processing_show + '" data-blog-controls-count="transcoding_count">' +
						'<a class="control-item control-anchor queue" href="/blog/' + m_user.name + '/processing">' +
							'<div class="hide_overflow">Processing</div>' +
							'<span class="count">' + m_user.processing.toLocaleString() + '</span>' +
						'</a>' +
					'</li>' +
					'<li class="controls_section_item' + queue_show + '" data-blog-controls-count="queued_post_count">' +
						'<a class="control-item control-anchor queue" href="/blog/' + m_user.name + '/queue">' +
							'<div class="hide_overflow">Queue</div>' +
							'<span class="count">' + m_user.queue.toLocaleString() + '</span>' +
						'</a>' +
					'</li>' +
					'<li class="controls_section_item no_push">' +
						'<a class="control-item control-anchor customize" href="/settings/blog/' + m_user.name + '">' +
							'<div class="hide_overflow">' +
								'Edit appearance<i class="sub_control link_arrow icon_right icon_arrow_carrot_right"></i>' +
							'</div>' +
						'</a>' +
					'</li>' +
				'</ul>' +
				'<ul id="xkit-dashboard-account" class="controls_section"></ul>';

		$(".recommended_tumblelogs").before(xf_html);

	//	$("#old_stats_activity").after(activity_graph.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1]);

		/*
		var canvas = $('#xkit-activity-canvas');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');


            var activity_sparkline = XKit.interface.user().activity.slice(1,-1).split(",");
            // Convert each string to int in array
            for (var i=0; i<activity_sparkline.length; i++) {
                activity_sparkline[i] = parseInt(activity_sparkline[i], 10);
            }

            var activity_max = getMaxOfArray(activity_sparkline);
            var activity_min = getMinOfArray(activity_sparkline);

            var path=new Path2D();

            path.moveTo(0, Math.round(15 - (activity_sparkline[0]-activity_min)/(activity_max-activity_min)*15));

            for (var n=1; n<activity_sparkline.length; n++) {
                activity_sparkline[n] = Math.round(15 - (activity_sparkline[n]-activity_min)/(activity_max-activity_min)*15);
                path.lineTo(n*3, activity_sparkline[n]);
                path.moveTo(n*3, activity_sparkline[n]);
            }

            var path=new Path2D();
            path.moveTo(0,7);
            path.lineTo(36,15);
            path.lineTo(3,0);
            ctx.fill(path);

            //ctx.stroke(path);
        }*/

	},


	destroy: function() {
		this.running = false;
	}

});
