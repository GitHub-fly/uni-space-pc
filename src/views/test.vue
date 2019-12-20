<template>
	<div class="hy-index-large">
		<div class="hy-index-left ba-col-1 ">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">Application</v-list-item-title>
						<v-list-item-subtitle>subtext</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item to="/index">
						<v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>主页</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item link to="/photoAlbum">
						<v-list-item-icon><v-icon>mdi-image</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>相册</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item link>
						<v-list-item-icon><v-icon>mdi-widgets</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>应用</v-list-item-title></v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</div>

		<div class="hy-index-mid ba-col-9">
			<v-container>
				<v-row>
					<v-expansion-panels popout>
						<v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
							<v-expansion-panel-header ripple>
								<v-row align="center" class="spacer" no-gutters>
									<v-col cols="4" sm="2" md="1">
										<v-avatar size="80px">
											<img v-if="user.avatar" :alt="user.nickname" :src="user.avatar" />
											<v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
										</v-avatar>
									</v-col>
			
									<v-col class="hidden-xs-only" sm="5" md="4" justify="center">
										<strong v-html="user.nickname"></strong>
										<br />
										<br />
										<span v-if="user.constellation" class="grey--text">&nbsp;({{ user.constellation }})</span>
									</v-col>
			
									<v-col class="text-no-wrap" cols="5" sm="3"><strong v-html="message.title"></strong></v-col>
			
									<v-col class="grey--text text-truncate hidden-sm-and-down">&mdash; 文章数 {{ user.journalSum }}</v-col>
								</v-row>
							</v-expansion-panel-header>
			
							<v-expansion-panel-content>
								<v-divider></v-divider>
								<v-card-text v-text="user.introduction"></v-card-text>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-row>
			
				<v-row>
					<v-col cols="12" v-if="journals.length != 0">
						<v-card class="mx-auto" max-width="100%">
							<v-img class="#353535--text align-end" height="200px" :src="getImage(journal.thumbnail)">
								<v-card-title v-text="journal.title"></v-card-title>
							</v-img>
			
							<v-card-subtitle class="pb-0">{{ journal.createTime }}</v-card-subtitle>
			
							<v-card-text class="text--primary">
								<div>Whitehaven Beach</div>
								<div>Whitsunday Island, Whitsunday Islands</div>
							</v-card-text>
			
							<v-card-actions>
								<v-btn color="orange" text>{{ journal.likes }} 人喜欢</v-btn>
			
								<v-btn color="orange" text>{{ journal.comments }} 人评论</v-btn>
			
								<v-spacer></v-spacer>
								<v-btn icon @click="likes(journal.id)">
									<v-icon>mdi-heart</v-icon>
								<!-- <v-btn icon> -->
									<!-- <v-icon color="gray" v-if="!colorStatus(journal.id)">mdi-heart</v-icon> -->
									<!-- <v-icon color="red" v-if="colorStatus(journal.id)">mdi-heart</v-icon> -->
								</v-btn>
			
								<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>
			
								<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-col v-else>
						<v-card-text>还没有日志哦~</v-card-text>
					</v-col>
				</v-row>
			
				<v-row>
					<v-col v-for="card in journals.slice(1)" :key="card.title" cols="4">
						<v-card class="mx-auto" max-width="100%">
							<v-img class="white--text align-end" height="200px" :src="getImage(card.thumbnail)"><v-card-title v-text="card.title"></v-card-title></v-img>
			
							<v-card-subtitle class="pb-0">{{ card.createTime }}</v-card-subtitle>
			
							<v-card-text class="text--primary">
								<div>Whitehaven Beach</div>
			
								<div>Whitsunday Island, Whitsunday Islands</div>
							</v-card-text>
			
							<v-card-actions>
								<v-btn color="orange" text>{{ card.likes }} 人喜欢</v-btn>
			
								<v-btn color="orange" text>{{ card.comments }} 人评论</v-btn>
			
								<v-spacer></v-spacer>
			
								<v-btn icon @click="likes(card.id)"><v-icon>mdi-heart</v-icon></v-btn>
			
								<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>
			
								<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			
			</v-container>
		</div>
	
	</div>
</template>