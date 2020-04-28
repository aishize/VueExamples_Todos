<template>
  <v-container>
    <div id="message" v-if="message">{{ message }}</div>

    <div v-if="authenticated">
      <v-btn 
        class="new-post" 
        to="/posts/new"
      >
        New Post
      </v-btn>
    </div>

    <h1>Posts</h1>
    <v-card 
      v-for="post in posts" 
      :key="post.id" 
      class="post"
    >
      <v-btn :to="postLink(post.id)">
        {{ post.title }}
      </v-btn>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Posts',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated
    },

    posts() {
      return this.$store.state.posts
    }
  },

  methods: {
    postLink(id) {
      return `/posts/${id}`
    }
  }
}
</script>>